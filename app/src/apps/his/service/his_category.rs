use anyhow::{anyhow, Result};
use chrono::{Local, NaiveDateTime};
use db::{
    common::res::{ListData, PageParams},
    his::{
        entities::{prelude::*, category},
        models::category::{AddReq, DeleteReq, EditReq, Resp, SearchReq},
    },
};
use sea_orm::{sea_query::Expr, ColumnTrait, ConnectionTrait, DatabaseConnection, EntityTrait, Order, PaginatorTrait, QueryFilter, QueryOrder, Set, TransactionTrait, Condition, InsertResult};
use db::his::entities::medicinal;

/// get_list 获取列表
/// page_params 分页参数
/// db 数据库连接 使用db.0
pub async fn get_sort_list(db: &DatabaseConnection, page_params: PageParams, req: SearchReq) -> Result<ListData<category::Model>> {
    let page_num = page_params.page_num.unwrap_or(1);
    let page_per_size = page_params.page_size.unwrap_or(10);
    //  生成查询条件
    let mut s = Category::find();

    if let Some(x) = req.name {
        if !x.is_empty() {
            s = s.filter(category::Column::Name.contains(&x));
        }
    }

    // 获取全部数据条数
    let total = s.clone().count(db).await?;
    // 分页获取数据
    let paginator = s.order_by_asc(category::Column::Id).paginate(db, page_per_size);
    let total_pages = paginator.num_pages().await?;
    let list = paginator.fetch_page(page_num - 1).await?;

    let res = ListData {
        total,
        total_pages,
        list,
        page_num,
    };
    Ok(res)
}

pub async fn check_data_is_exist(name: String, user_id: String, db: &DatabaseConnection) -> Result<bool> {
    let count = Category::find()
        .filter(
            Condition::all()
                .add(category::Column::Name.eq(name))
                .add(category::Column::CreatedBy.eq(user_id))
            )
        .count(db).await?;
    Ok(count > 0)
}

pub async fn eidt_check_data_is_exist(id: u32, db: &DatabaseConnection) -> Result<bool> {
    let count = Category::find_by_id(id.to_string()).count(db).await?;
    Ok(count > 0)
}

/// add 添加
pub async fn add(db: &DatabaseConnection, req: AddReq, user_id: String) -> Result<String> {
    //  检查字典类型是否存在
    if check_data_is_exist(req.clone().name, user_id.clone(), db).await? {
        return Err(anyhow!("数据已存在"));
    }

    let now: NaiveDateTime = Local::now().naive_local();
    let cate = category::ActiveModel {
        name: Set(req.name),
        created_by: Set(user_id),
        created_at: Set(Some(now)),
        ..Default::default()
    };
    let txn = db.begin().await?;
    Category::insert(cate).exec(&txn).await?;
    txn.commit().await?;
    Ok("添加成功".to_string())
}

/// delete 完全删除
pub async fn delete(db: &DatabaseConnection, delete_req: DeleteReq) -> Result<String> {
    // 如果在medicinal之中有引用,则不能删除
    let count = Medicinal::find().filter(medicinal::Column::CategoryId.is_in(delete_req.ids.clone())).count(db).await?;
    if count > 0 {
        return Err(anyhow!("删除失败,类目还在被药品引用不能删除,请删除相关的药品记录."));
    }

    let mut s = Category::delete_many();

    s = s.filter(category::Column::Id.is_in(delete_req.ids));

    // 开始删除
    let d = s.exec(db).await?;

    match d.rows_affected {
        0 => Err(anyhow!("删除失败,数据不存在")),
        i => Ok(format!("成功删除{}条数据", i)),
    }
}

// edit 修改
pub async fn edit(db: &DatabaseConnection, req: EditReq, user_id: String) -> Result<String> {
    //  检查字典类型是否存在
    if !eidt_check_data_is_exist(req.id, db).await? {
        return Err(anyhow!("数据不存在"));
    }
    category::Entity::update_many()
        .col_expr(category::Column::Name, Expr::value(req.name))
        .col_expr(category::Column::UpdatedBy, Expr::value(user_id))
        .col_expr(category::Column::UpdatedAt, Expr::value(Local::now().naive_local()))
        .filter(category::Column::Id.eq(req.id))
        .exec(db)
        .await?;
    // 更新
    Ok("用户数据更新成功".to_string())
}

/// get_user_by_id 获取用户Id获取用户
/// db 数据库连接 使用db.0
pub async fn get_by_id(db: &DatabaseConnection, search_req: SearchReq) -> Result<Resp> {
    let mut s = Category::find();
    s = s.filter(category::Column::DeletedAt.is_null());
    //
    if let Some(x) = search_req.id {
        s = s.filter(category::Column::Id.eq(x));
    } else {
        return Err(anyhow!("请求参数错误"));
    }

    let res = match s.into_model::<Resp>().one(db).await? {
        Some(m) => m,
        None => return Err(anyhow!("数据不存在")),
    };

    // let result: Resp =
    // serde_json::from_value(serde_json::json!(res))?;
    // //这种数据转换效率不知道怎么样

    Ok(res)
}

/// 通过名字获取 id
pub async fn get_id_or_insert(db: &DatabaseConnection, name: String, user_id: String) -> Result<u32> {
    // 先查找，有则返回，没有则insert
    let res = Category::find()
        .filter(
            Condition::all()
                .add(category::Column::DeletedAt.is_null())
                .add(category::Column::Name.eq(name.clone()))
                .add(category::Column::CreatedBy.eq(user_id.to_clone()))
        )
        .into_model::<Resp>().one(db).await?;

    if res.is_some() {
        return Ok(res.unwrap().id);
    }

    // 找不到则新建
    let now: NaiveDateTime = Local::now().naive_local();
    let cate = category::ActiveModel {
        name: Set(name),
        created_by: Set(user_id),
        created_at: Set(Some(now)),
        ..Default::default()
    };
    let txn = db.begin().await?;
    let res: InsertResult<_> = Category::insert(cate).exec(&txn).await?;
    txn.commit().await?;

    Ok(res.last_insert_id)
}


pub async fn get_category_ids_by_user_id(db: &DatabaseConnection, user_id: &str) -> Result<Vec<u32>> {
    let s = Category::find().filter(category::Column::CreatedBy.eq(user_id)).all(db).await?;

    let mut res = Vec::new();

    for x in s {
        res.push(x.id);
    }

    Ok(res)
}

/// get_all 获取全部
/// db 数据库连接 使用db.0
pub async fn get_all(db: &DatabaseConnection) -> Result<Vec<Resp>> {
    let s = Category::find()
        .filter(category::Column::DeletedAt.is_null())
        .order_by(category::Column::Id, Order::Asc)
        .into_model::<Resp>()
        .all(db)
        .await?;
    Ok(s)
}

pub async fn delete_category_by_user_id<C>(db: &C, user_ids: Vec<String>) -> Result<()>
    where
        C: TransactionTrait + ConnectionTrait,
{
    Category::delete_many().filter(category::Column::CreatedBy.is_in(user_ids)).exec(db).await?;
    Ok(())
}

// pub async fn add_category_by_user_id<C>(db: &C, user_id: &str, post: Vec<u32>) -> Result<()>
//     where
//         C: TransactionTrait + ConnectionTrait,
// {
//     let mut inser_data: Vec<category::ActiveModel> = Vec::new();
//     for x in post {
//         let now: NaiveDateTime = Local::now().naive_local();
//         let act = category::ActiveModel {
//             created_by: Set(user_id.to_string()),
//             id: Set(x),
//             created_at: Set(Some(now)),
//         };
//         inser_data.push(act);
//     }
//     Category::insert_many(inser_data).exec(db).await?;
//     Ok(())
// }

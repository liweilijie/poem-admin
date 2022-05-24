use anyhow::{anyhow, Result};
use chrono::{Local, NaiveDateTime};
use db::{
    common::res::{ListData, PageParams},
    his::{
        entities::{prelude::*, medicinal},
        models::medicinal::{AddReq, DeleteReq, EditReq, Resp, SearchReq},
    },
};
use sea_orm::{sea_query::Expr, ColumnTrait, ConnectionTrait, DatabaseConnection, EntityTrait, Order, PaginatorTrait, QueryFilter, QueryOrder, Set, TransactionTrait, Condition};
use sea_orm::prelude::Date;
use tracing::debug;
use db::his::entities::category;

/// get_list 获取列表
/// page_params 分页参数
/// db 数据库连接 使用db.0
pub async fn get_sort_list(db: &DatabaseConnection, page_params: PageParams, req: SearchReq) -> Result<ListData<db::his::models::medicinal::Resp>> {
    debug!("req:{:?}", req);
    let page_num = page_params.page_num.unwrap_or(1);
    let page_per_size = page_params.page_size.unwrap_or(10);
    //  生成查询条件
    let mut s = Medicinal::find().find_also_related(Category);

    if let Some(x) = req.name {
        if !x.is_empty() {
            s = s.filter(medicinal::Column::Name.contains(&x));
        }
    }

    if let Some(x) = req.category_id {
        if x != 0 {
            s = s.filter(medicinal::Column::CategoryId.eq(x));
        }
    }

    if let Some(x) = req.status {
        if !x.is_empty() {
            s = s.filter(medicinal::Column::Status.eq(x));
        }
    }

    if let Some(x) = req.begin_time {
        if !x.is_empty() {
            let x = x + " 00:00:00";
            let t = NaiveDateTime::parse_from_str(&x, "%Y-%m-%d %H:%M:%S")?;
            s = s.filter(medicinal::Column::CreatedAt.gte(t));
        }
    }
    if let Some(x) = req.end_time {
        if !x.is_empty() {
            let x = x + " 23:59:59";
            let t = NaiveDateTime::parse_from_str(&x, "%Y-%m-%d %H:%M:%S")?;
            s = s.filter(medicinal::Column::CreatedAt.lte(t));
        }
    }
    // 获取全部数据条数
    let total = s.clone().count(db).await?;
    // 分页获取数据
    let paginator = s.order_by_asc(medicinal::Column::Validity).paginate(db, page_per_size);
    let total_pages = paginator.num_pages().await?;
    let list = paginator.fetch_page(page_num - 1).await?;

    let mut list_resp: Vec<Resp> = Vec::new();
    for item in list.iter() {
        println!("{:?}", item);
        if item.1.is_none() {
            println!("error data: {:?}", item);
            continue
        }

        let resp = Resp {
            id: item.0.id,
            category_id: item.0.category_id,
            category_name: item.1.as_ref().unwrap().name.to_owned(),
            name: item.0.name.clone(),
            batch_number: item.0.batch_number.clone(),
            spec: item.0.spec.clone(),
            count: item.0.count.clone(),
            status: item.0.status.clone(),
            validity: item.0.validity,
            created_at: item.0.created_at
        };

        list_resp.push(resp);
    }

    let res = ListData {
        total,
        total_pages,
        list: list_resp,
        page_num,
    };
    Ok(res)
}

pub async fn check_data_is_exist(category_id: u32, name: String, validity: Date, user_id: String, db: &DatabaseConnection) -> Result<bool> {
    let count = Medicinal::find()
        .filter(
            Condition::all()
                .add(medicinal::Column::CategoryId.eq(category_id))
                .add(medicinal::Column::Name.eq(name))
                .add(medicinal::Column::Validity.eq(validity))
                .add(medicinal::Column::CreatedBy.eq(user_id))
            )
        .count(db).await?;
    Ok(count > 0)
}

pub async fn eidt_check_data_is_exist(id: u32, db: &DatabaseConnection) -> Result<bool> {
    let count = Medicinal::find_by_id(id.to_string()).count(db).await?;
    Ok(count > 0)
}

/// add 添加
pub async fn add(db: &DatabaseConnection, req: AddReq, user_id: String) -> Result<String> {
    //  检查字典类型是否存在
    if check_data_is_exist(req.clone().category_id, req.clone().name, req.clone().validity, user_id.clone(), db).await? {
        return Err(anyhow!("数据已存在"));
    }

    let now: NaiveDateTime = Local::now().naive_local();
    let med = medicinal::ActiveModel {
        name: Set(req.name),
        category_id: Set(req.category_id),
        batch_number: Set(req.batch_number.unwrap_or_else(|| "".to_string())),
        spec: Set(req.spec.unwrap_or_else(|| "".to_string())),
        count: Set(req.count.unwrap_or_else(|| "".to_string())),
        validity: Set(req.validity),
        status: Set(req.status.unwrap_or_else(|| "".to_string())),
        created_by: Set(user_id),
        created_at: Set(Some(now)),
        ..Default::default()
    };
    let txn = db.begin().await?;
    Medicinal::insert(med).exec(&txn).await?;
    txn.commit().await?;
    Ok("添加成功".to_string())
}

/// delete 完全删除
pub async fn delete(db: &DatabaseConnection, delete_req: DeleteReq) -> Result<String> {
    let mut s = Medicinal::delete_many();

    s = s.filter(medicinal::Column::Id.is_in(delete_req.ids));

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
    medicinal::Entity::update_many()
        .col_expr(medicinal::Column::Name, Expr::value(req.name))
        .col_expr(medicinal::Column::CategoryId, Expr::value(req.category_id))
        .col_expr(medicinal::Column::BatchNumber, Expr::value(req.batch_number))
        .col_expr(medicinal::Column::Spec, Expr::value(req.spec))
        .col_expr(medicinal::Column::Count, Expr::value(req.count))
        .col_expr(medicinal::Column::Validity, Expr::value(req.validity))
        .col_expr(medicinal::Column::Status, Expr::value(req.status))
        .col_expr(medicinal::Column::UpdatedBy, Expr::value(user_id))
        .col_expr(medicinal::Column::UpdatedAt, Expr::value(Local::now().naive_local()))
        .filter(medicinal::Column::Id.eq(req.id))
        .exec(db)
        .await?;
    // 更新
    Ok("用户数据更新成功".to_string())
}

/// get_user_by_id 获取用户Id获取用户
/// db 数据库连接 使用db.0
pub async fn get_by_id(db: &DatabaseConnection, search_req: SearchReq) -> Result<Resp> {
    let mut s = Medicinal::find().find_also_related(Category);
    s = s.filter(medicinal::Column::DeletedAt.is_null());
    //
    if let Some(x) = search_req.id {
        s = s.filter(medicinal::Column::Id.eq(x));
    } else {
        return Err(anyhow!("请求参数错误"));
    }

    let res = match s.one(db).await? {
        // let res = match s.into_model::<_,_>().one(db).await? {
        Some(m) => m,
        None => return Err(anyhow!("数据不存在")),
    };

    println!("{:?}", res);

    let res = Resp {
        id: res.0.id,
        category_id: res.0.category_id,
        category_name: res.1.as_ref().unwrap().name.to_owned(),
        name: res.0.name.clone(),
        batch_number: res.0.batch_number,
        spec: res.0.spec,
        count: res.0.count,
        status: res.0.status,
        validity: res.0.validity,
        created_at: res.0.created_at
    };

    println!("2222: {:?}", res);

    // let result: Resp =
    // serde_json::from_value(serde_json::json!(res))?;
    // //这种数据转换效率不知道怎么样

    Ok(res)
}

pub async fn get_medicinal_ids_by_user_id(db: &DatabaseConnection, user_id: &str) -> Result<Vec<u32>> {
    let s = Medicinal::find().filter(medicinal::Column::CreatedBy.eq(user_id)).all(db).await?;

    let mut res = Vec::new();

    for x in s {
        res.push(x.id);
    }

    Ok(res)
}

/// get_all 获取全部
/// db 数据库连接 使用db.0
pub async fn get_all(db: &DatabaseConnection) -> Result<Vec<Resp>> {
    let s = Medicinal::find()
        .filter(medicinal::Column::DeletedAt.is_null())
        .filter(medicinal::Column::Status.eq("1"))
        .order_by(medicinal::Column::Id, Order::Asc)
        .into_model::<Resp>()
        .all(db)
        .await?;
    Ok(s)
}

pub async fn delete_medicinal_by_user_id<C>(db: &C, user_ids: Vec<String>) -> Result<()>
    where
        C: TransactionTrait + ConnectionTrait,
{
    Medicinal::delete_many().filter(medicinal::Column::CreatedBy.is_in(user_ids)).exec(db).await?;
    Ok(())
}

// pub async fn add_medicinal_by_user_id<C>(db: &C, user_id: &str, post: Vec<u32>) -> Result<()>
//     where
//         C: TransactionTrait + ConnectionTrait,
// {
//     let mut inser_data: Vec<medicinal::ActiveModel> = Vec::new();
//     for x in post {
//         let now: NaiveDateTime = Local::now().naive_local();
//         let act = medicinal::ActiveModel {
//             created_by: Set(user_id.to_string()),
//             id: Set(x),
//             created_at: Set(Some(now)),
//         };
//         inser_data.push(act);
//     }
//     Medicinal::insert_many(inser_data).exec(db).await?;
//     Ok(())
// }

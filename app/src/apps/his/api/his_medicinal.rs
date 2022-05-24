use db::{
    common::res::{ListData, PageParams, Res},
    db_conn,
    his::{
        entities::medicinal,
        models::medicinal::{AddReq, DeleteReq, EditReq, Resp, SearchReq},
    },
    DB,
};
use poem::{
    handler,
    web::{Json, Query},
};
use poem::web::Multipart;
use tracing::debug;

use super::super::service;
use crate::utils::jwt::Claims;

/// get_list 获取列表
/// page_params 分页参数
#[handler]
pub async fn get_sort_list(Query(page_params): Query<PageParams>, Query(req): Query<SearchReq>) -> Res<ListData<db::his::models::medicinal::Resp>> {
    let db = DB.get_or_init(db_conn).await;
    let res = service::his_medicinal::get_sort_list(db, page_params, req).await;
    match res {
        Ok(x) => Res::with_data(x),
        Err(e) => Res::with_err(&e.to_string()),
    }
}

/// add 添加
#[handler]
pub async fn add(Json(req): Json<AddReq>, user: Claims) -> Res<String> {
    debug!("add req:{:?}", req);
    let db = DB.get_or_init(db_conn).await;
    let res = service::his_medicinal::add(db, req, user.id).await;
    match res {
        Ok(x) => Res::with_msg(&x),
        Err(e) => Res::with_err(&e.to_string()),
    }
}

/// delete 完全删除
#[handler]
pub async fn delete(Json(req): Json<DeleteReq>) -> Res<String> {
    let db = DB.get_or_init(db_conn).await;
    let res = service::his_medicinal::delete(db, req).await;
    match res {
        Ok(x) => Res::with_msg(&x),
        Err(e) => Res::with_err(&e.to_string()),
    }
}

// edit 修改
#[handler]
pub async fn edit(Json(req): Json<EditReq>, user: Claims) -> Res<String> {
    let db = DB.get_or_init(db_conn).await;
    let res = service::his_medicinal::edit(db, req, user.id).await;
    match res {
        Ok(x) => Res::with_msg(&x),
        Err(e) => Res::with_err(&e.to_string()),
    }
}

/// get_user_by_id 获取用户Id获取用户
#[handler]
pub async fn get_by_id(Query(req): Query<SearchReq>) -> Res<Resp> {
    let db = DB.get_or_init(db_conn).await;
    let res = service::his_medicinal::get_by_id(db, req).await;
    match res {
        Ok(x) => Res::with_data(x),
        Err(e) => Res::with_err(&e.to_string()),
    }
}

/// get_all 获取全部
#[handler]
pub async fn get_all() -> Res<Vec<Resp>> {
    let db = DB.get_or_init(db_conn).await;
    let res = service::his_medicinal::get_all(db).await;
    match res {
        Ok(x) => Res::with_data(x),
        Err(e) => Res::with_err(&e.to_string()),
    }
}

/// upload 上传文件
#[handler]
pub async fn upload(mut multipart: Multipart) -> &'static str {
    while let Ok(Some(field)) = multipart.next_field().await {
        let name = field.name().map(ToString::to_string);
        let file_name = field.file_name().map(ToString::to_string);
        if let Ok(bytes) = field.bytes().await {
            println!(
                "name={:?} filename={:?} length={}",
                name,
                file_name,
                bytes.len()
            );
        }
    }
    "File uploaded successfully!"
}


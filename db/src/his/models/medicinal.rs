use sea_orm::{entity::prelude::{DateTime, Date}, FromQueryResult};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug)]
pub struct SearchReq {
    pub id: Option<u32>,
    pub name: Option<String>,
    pub category_id: Option<u32>,
    pub status: Option<String>,
    pub begin_time: Option<String>,
    pub end_time: Option<String>,
}

#[derive(Deserialize, Clone, Debug)]
pub struct AddReq {
    pub name: String,
    pub category_id: u32,
    pub batch_number: Option<String>,
    pub spec: Option<String>,
    pub count: Option<String>,
    pub status: Option<String>,
    pub validity: Date,
}

#[derive(Deserialize)]
pub struct DeleteReq {
    pub ids: Vec<u32>,
}

#[derive(Deserialize, Clone, Debug)]
pub struct EditReq {
    pub id: u32,
    pub category_id: u32,
    pub name: String,
    pub batch_number: Option<String>,
    pub spec: Option<String>,
    pub count: Option<String>,
    pub status: Option<String>,
    pub validity: Date,
}

#[derive(Debug, Serialize, FromQueryResult)]
pub struct Resp {
    pub id: u32,
    pub category_id: u32,
    pub name: String,
    pub batch_number: String,
    pub spec: String,
    pub count: String,
    pub status: String,
    pub validity: Date,
    pub created_at: DateTime,
}

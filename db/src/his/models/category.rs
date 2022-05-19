use sea_orm::FromQueryResult;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug)]
pub struct SearchReq {
    pub id: Option<u32>,
    pub name: Option<String>,
}

#[derive(Deserialize, Clone, Debug)]
pub struct AddReq {
    pub name: String,
}

#[derive(Deserialize)]
pub struct DeleteReq {
    pub ids: Vec<u32>,
}

#[derive(Deserialize, Clone, Debug)]
pub struct EditReq {
    pub id: u32,
    pub name: String,
}

#[derive(Debug, Serialize, FromQueryResult)]
pub struct Resp {
    pub id: u32,
    pub name: String,
}

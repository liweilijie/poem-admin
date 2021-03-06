//! SeaORM Entity. Generated by sea-orm-codegen 0.7.0

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Copy, Clone, Default, Debug, DeriveEntity)]
pub struct Entity;

impl EntityName for Entity {
    fn table_name(&self) -> &str {
        "his_medicinal"
    }
}

#[derive(Clone, Debug, PartialEq, DeriveModel, DeriveActiveModel, Serialize, Deserialize)]
pub struct Model {
    pub id: u32,
    pub category_id: u32,
    pub name: String,
    pub batch_number: String,
    pub spec: String,
    pub count: String,
    pub validity: Date,
    pub status: String,
    pub created_by: String,
    pub updated_by: Option<String>,
    pub created_at: Option<DateTime>,
    pub updated_at: Option<DateTime>,
    pub notify_at: Option<DateTime>,
    pub deleted_at: Option<DateTime>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]
pub enum Column {
    Id,
    CategoryId,
    Name,
    BatchNumber,
    Spec,
    Count,
    Validity,
    Status,
    CreatedBy,
    UpdatedBy,
    CreatedAt,
    UpdatedAt,
    NotifyAt,
    DeletedAt,
}

#[derive(Copy, Clone, Debug, EnumIter, DerivePrimaryKey)]
pub enum PrimaryKey {
    Id,
}

impl PrimaryKeyTrait for PrimaryKey {
    type ValueType = String;
    fn auto_increment() -> bool {
        true
    }
}

#[derive(Copy, Clone, Debug, EnumIter)]
pub enum Relation {
    Category,
}

impl ColumnTrait for Column {
    type EntityName = Entity;
    fn def(&self) -> ColumnDef {
        match self {
            Self::Id => ColumnType::Unsigned.def(),
            Self::CategoryId => ColumnType::Unsigned.def(),
            Self::Name => ColumnType::String(Some(255u32)).def(),
            Self::BatchNumber => ColumnType::String(Some(255u32)).def(),
            Self::Spec => ColumnType::String(Some(255u32)).def(),
            Self::Count => ColumnType::String(Some(255u32)).def(),
            Self::Validity => ColumnType::Date.def().null(),
            Self::Status => ColumnType::Char(Some(1u32)).def(),
            Self::CreatedBy => ColumnType::String(Some(32u32)).def(),
            Self::UpdatedBy => ColumnType::String(Some(32u32)).def().null(),
            Self::CreatedAt => ColumnType::DateTime.def().null(),
            Self::UpdatedAt => ColumnType::DateTime.def().null(),
            Self::NotifyAt => ColumnType::DateTime.def().null(),
            Self::DeletedAt => ColumnType::DateTime.def().null(),
        }
    }
}

impl RelationTrait for Relation {
    fn def(&self) -> RelationDef {
        match self {
            Self::Category => Entity::belongs_to(super::category::Entity)
                .from(Column::CategoryId)
                .to(super::category::Column::Id)
                .into(),
        }
    }
}

impl Related<super::category::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Category.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}

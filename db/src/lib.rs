pub mod common;
pub mod db;
pub mod system;
pub mod his;
pub mod test;

// 重新导出
pub use crate::db::{db_conn, DB};


#[cfg(test)]
#[allow(dead_code)]
#[allow(unused_imports)]
#[allow(unused_variables)]
mod tests {
    use sea_orm::{Database, DatabaseConnection};
    use super::*;
    use sea_orm::{entity::*, error::*, query::*, DbConn, FromQueryResult};
    use tracing::info;
    use tracing_subscriber::layer::SubscriberExt;
    use tracing_subscriber::util::SubscriberInitExt;
    use crate::his::entities::{category, medicinal};
    use crate::his::entities::prelude::{Category, Medicinal};

    #[tokio::test]
    async fn test_db() -> Result<(), DbErr> {
        tracing_subscriber::registry()
            .with(tracing_subscriber::EnvFilter::new(
                "test=debug,db=debug,sea_orm=debug".to_string(),
            ))
            .with(tracing_subscriber::fmt::layer())
            .init();

        let db_url = "mysql://root:sbso129129@sub:3306/poem";
        let dbc: DatabaseConnection = Database::connect(db_url).await?;

        info!("connect {} success.", db_url);
        println!("connect {} success.", db_url);

        get_all_medicinal(&dbc).await?;

        Ok(())
    }

    async fn get_all_medicinal(dbc: &DbConn) -> Result<(), DbErr> {
        let mes: Vec<medicinal::Model> = Medicinal::find().all(dbc).await?;

        for m in mes.iter() {
            // info!("name:{}, validity:{}", m.name, m.validity);
            info!("{:?}", m);
            let cate: Option<category::Model> = Category::find_by_id(m.category_id.to_string()).one(dbc).await?;
            let cate: category::Model = cate.unwrap();
            println!("{}, {:?}", cate.name, m);
        }

        Ok(())
    }
}
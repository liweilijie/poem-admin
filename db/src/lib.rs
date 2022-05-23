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
    use sea_orm::ColumnType::DateTime;
    use tracing::info;
    use tracing_subscriber::layer::SubscriberExt;
    use tracing_subscriber::util::SubscriberInitExt;
    use crate::his::entities::{category, medicinal};
    use crate::his::entities::prelude::{Category, Medicinal};
    use crate::his::models::medicinal::Resp;

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

        // get_all_medicinal(&dbc).await?;
        get_all_categories_with_medicinal(&dbc).await?;

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


    async fn get_all_categories_with_medicinal(dbc: &DbConn) -> Result<(), DbErr> {
        // One to Many
        // let cake_with_fruits: Vec<(cake::Model, Vec<fruit::Model>)> = Cake::find()
        //     .find_with_related(Fruit)
        //     .all(db)
        //     .await?;

        let cate_with_med: Vec<(category::Model, Vec<medicinal::Model>)> = Category::find()
            .find_with_related(Medicinal)
            .all(dbc)
            .await?;

        for item in cate_with_med {
            println!("{:?}", item)
        }

        // One to One
        // let cake_and_fruit: Vec<(cake::Model, Option<fruit::Model>)> = Cake::find().find_also_related(Fruit).all(db).await?;

        println!("-------------------------------------------------");

        let meds: Vec<(medicinal::Model, Option<category::Model>)> = Medicinal::find().find_also_related(Category).all(dbc).await?;
        let mut list: Vec<Resp> = Vec::new();
        for item in meds.iter() {
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

            list.push(resp);
        }

        println!("{:?}", list);

        Ok(())
    }
}
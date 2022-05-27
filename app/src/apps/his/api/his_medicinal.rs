use std::path::PathBuf;
use anyhow::anyhow;
use anyhow::Result;
use chrono::{Datelike, Local};
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
use tracing::{debug, error, info, warn};
use configs::CFG;
use encoding_rs::{Encoder, Encoding, GBK, UTF_8};
use db::his::models::medicinal::ImportData;

use super::super::service;
use crate::utils::jwt::Claims;

const DEFAULT_VALIDITY_DATE: &str = "2099-12-31";

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
        Ok(x) => {
            // 新增加数据更新一下状态
            let _ = service::his_medicinal::medicinal_validity_scan(db).await;
            Res::with_msg(&x)
        },
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
        Ok(x) => {
            //  编辑数据更新一下状态
            let _ = service::his_medicinal::medicinal_validity_scan(db).await;
            Res::with_msg(&x)
        },
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
pub async fn import(mut multipart: Multipart, user: Claims) -> Res<String> {
    debug!("import user:{:?}", user);
    let db = DB.get_or_init(db_conn).await;

    while let Ok(Some(field)) = multipart.next_field().await {

        let file_name = field.file_name().map(ToString::to_string);

        if file_name.is_none() {
            return Res::with_err(&"import file name is empty.");
        }

        let file_name = file_name.unwrap();

        let sc = PathBuf::from(file_name.clone());

        match sc.extension().and_then(|s| s.to_str()) {
            Some("csv") => (),
            // Some("csv") | Some("xlsx") | Some("xlsm") | Some("xlsb") | Some("xls") => (),
            _ => {
                return Res::with_err(&"上传文件格式错误( 建议将文件另存为 csv, 上传 csv 格式的文件)");
            }
        }

        let data = match field.bytes().await {
            Ok(d, ..) => d,
            Err(err) => {
                error!("received {} error:{:?}", file_name, err);
                return Res::with_err(&format!("received {} error:{:?}", file_name, err));
            }
        };

        debug!("import and filename:{:#?}, data size:{}", file_name, data.len());

        // 文件创建以时间为前缀
        let to_path = format!(
            "{}/{}-{}",
            CFG.web.upload_dir.clone(),
            format!(
                "upload_{}",
                chrono::Local::now().format("%Y-%m-%d_%H:%M:%S")
            ),
            file_name
        );

        debug!("import to_path:{}", to_path);

        // 保存上传的文件
        match tokio::fs::write(&to_path, &data).await {
            Ok(_) => (),
            Err(err) => {
                error!("tokio fs write error:{}", err);
                return Res::with_err(&format!("tokio fs write error:{}", err));
            }
        }

        // 读取文件内容
        return if let Ok((category, result, total_count, _success_count)) = load_csv_file(&to_path).await {
            // 将读取到的数据 insert 到数据库中
            let mut insert_count = 0;
            if result.len() > 0 && !category.is_empty() {
                // 先获取 category_id
                let category_id = match service::his_category::get_id_or_insert(db, category.clone(), user.id.clone()).await {
                    Ok(id) => id,
                    Err(e) => {
                        error!("insert category:{} error:{}", category, e);
                        return Res::with_err(&format!("insert category:{} error:{}", category, e));
                    }
                };

                info!("category_id:{}", category_id);


                for value in result.iter() {
                    debug!("will insert {:#?}", value);

                    service::his_medicinal::import(db, value, user.id.clone(), category_id).await
                        .map_or_else(
                            |e| { error!("import {:?} error:{}", value, e) },
                            |v| {
                                debug!("success import {:?}:{}", value, v);
                                insert_count += 1;
                            },
                        );
                }
            }

            // 如果有新插入的数据，则更新一下状态
            if insert_count > 0 {
               let _ = service::his_medicinal::medicinal_validity_scan(db).await;
            }

            debug!("import result total_count: {} and insert_count:{}", total_count, insert_count);

            Res::with_msg(&format!("总共有{}条，成功{}条，失败{}条。", total_count, insert_count, total_count - insert_count))
        } else {
            Res::with_err("读取文件异常。")
        }
    }

    return Res::with_msg(&"什么也没有处理".to_string());
}


// 读取 csv 文件内容，
// 返回值：
// category(类目名称)
// Vec<ImportData> 药品数据
// u32: 总条数
// u32: 成功处理条数
async fn load_csv_file(file: &str) -> Result<(String, Vec<ImportData>, u32, u32)> {
    info!("load csv file: {}", file);
    // 处理文件编码，有可能不是 utf8的需要转换
    let encoding_from = Encoding::for_label("gbk".as_bytes()).unwrap_or(GBK);
    let encoding_to = Encoding::for_label("utf8".as_bytes()).unwrap_or(UTF_8);
    convert_encoding(file, encoding_from, encoding_to);
    info!("convert_encoding done.");

    // 读取规则
    // 第一行是类目
    // 后面找到index 才能正常读取.
    // let mut rdr = csv::Reader::from_path(file).unwrap();
    let mut rdr = csv::ReaderBuilder::new()
        .has_headers(false)
        .delimiter(b',')
        .from_path(file)?;

    let mut category: Option<String> = None;
    let name_keys = vec!["药品", "名称", "药名", "项目", "型号"];
    let validity_keys = vec!["有效期", "有效期至", "效期", "有效"];
    let count_keys = vec!["数量", "基数", "数"];
    let batch_number_keys = vec!["批号", "生产日期", "生产"];
    let spec_keys = vec!["规格"];
    let skip_keys = vec!["签名"]; // 如果有内容包含签名的，则不进行处理与判断

    let mut name_index: Option<usize> = None;
    let mut count_index: Option<usize> = None;
    let mut validity_index: Option<usize> = None;
    let mut batch_number_index: Option<usize> = None;
    let mut spec_index: Option<usize> = None;
    let mut index_ok = false;
    let mut result_content: Vec<ImportData> = vec![];
    let mut success_count: u32 = 0;
    let mut total_count: u32 = 0;

    for row in rdr.records() {
        debug!("row: {:#?}", row);
        // 最正常的情况下有四列，第一列是药品名称， 第二列是批号，第三列是数量，第四列是有效期 当然顺序还可能不一样，所以要处理顺序
        // 说明有批号
        // 查找 category
        // 至少需要2列才正常, 一列是名字，一列是有效期
        if row.is_err() {
            warn!("row is err: {:?}", row);
            continue;
        }

        let row: csv::StringRecord = row.unwrap(); // 上面判断了这里不会 panic
        if row.len() < 2 {
            error!("excel column too small row.len < 2");
            continue;
        }

        // 所有行的内容都为空则跳过
        // all() 接受一个返回 true 或 false 的闭包。它将这个闭包应用于迭代器的每个元素，如果它们都返回 true，那么 all() 也返回。 如果它们中的任何一个返回 false，则返回 false。
        // all() 短路; 换句话说，它一旦找到 false 就会停止处理，因为无论发生什么，结果也将是 false。
        // 空的迭代器将返回 true。
        if row
            .iter()
            .all(|x| x.is_empty() || remove_whitespace(&x).is_empty())
        {
            continue;
        }

        // any() 短路; 换句话说，它一旦找到 true 就会停止处理，因为无论发生什么，结果也将是 true。
        // 如果任意一行有如下内容的则返回不计算
        // 所有字段都是空白的，则直接跳过
        if row.iter().any(|x| {
            skip_keys
                .iter()
                .any(|key| !x.is_empty() && remove_whitespace(&x.to_string()).contains(key))
        }) {
            warn!("找到过滤的行，所以此行不进行处理直接跳过。{:#?}", row);
            continue;
        }

        total_count += 1;

        if category.is_none() {
            // 判断是否是第一行为类目
            // 所有数据其他都为 Empty, 只有一个值是 String 类型的则为category
            if !row[0].is_empty() {
                let mut other_is_empty = true;
                for (index, val) in row.iter().enumerate() {
                    if index == 0 {
                        continue;
                    } else {
                        if !val.is_empty() {
                            other_is_empty = false;
                        }
                    }
                }
                if other_is_empty {
                    category = Some(row[0].to_string().trim().to_string());
                    debug!("category: {:?}", category);
                    total_count -= 1; // 不算在总数里面
                    continue;
                }
            }
        }

        // 查找标题index
        if !index_ok {
            debug!("row: {:#?}", row);
            name_index = row.iter().position(|x| {
                // 在 x 之中查找是否包含name_keys所有的关键字其中某一个
                name_keys
                    .iter()
                    .any(|key| !x.is_empty() && remove_whitespace(&x.to_string()).contains(key))
            });
            validity_index = row.iter().position(|x| {
                validity_keys
                    .iter()
                    .any(|key| !x.is_empty() && remove_whitespace(&x.to_string()).contains(key))
            });
            count_index = row.iter().position(|x| {
                count_keys
                    .iter()
                    .any(|key| !x.is_empty() && remove_whitespace(&x.to_string()).contains(key))
            });
            batch_number_index = row.iter().position(|x| {
                batch_number_keys
                    .iter()
                    .any(|key| !x.is_empty() && remove_whitespace(&x.to_string()).contains(key))
            });

            spec_index = row.iter().position(|x| {
                spec_keys
                    .iter()
                    .any(|key| !x.is_empty() && remove_whitespace(&x.to_string()).contains(key))
            });

            debug!(
                    "name_index: {:?}, validity_index: {:?}, count_ndex: {:?}, batch_number_index: {:?}, spec_index:{:?}",
                    name_index, validity_index, count_index, batch_number_index, spec_index,
                );

            if name_index.is_some()
                && validity_index.is_some()
                && name_index.unwrap() != validity_index.unwrap()
            {
                index_ok = true;
                total_count -= 1; // 不算在总数里面
            }
            continue;
        }

        // 获取数据
        if index_ok {
            let name = {
                if !row[name_index.unwrap()].is_empty() {
                    row[name_index.unwrap()].to_string().trim().to_string()
                } else {
                    "".to_string()
                }
            };
            if name == "" {
                warn!("skip because of name is empty: {:?}", row);
                continue;
            }

            let mut validity = remove_whitespace(&row[validity_index.unwrap()])
                .parse::<dateparser::DateTimeUtc>()
                .ok();

            if validity.is_none() {
                if remove_whitespace(&row[validity_index.unwrap()]) == "无".to_string() {
                    // 结定一个默认的日期
                    validity = Some(DEFAULT_VALIDITY_DATE.parse::<dateparser::DateTimeUtc>().unwrap());
                    warn!("匹配到 无，所以无效期默认为 {}", DEFAULT_VALIDITY_DATE);
                } else {
                    warn!("skip because of validity is empty: {:?}", row);
                    continue;
                }
            }

            let validity = validity.unwrap().0; // 只需要日期不需要时间
            let validity = validity.with_timezone(&Local);
            debug!("local validity: {:?}", validity);

            let count = if count_index.is_some() {
                row[count_index.unwrap()].to_string().trim().to_string()
            } else {
                "Empty".to_string()
            };

            let batch_number = if batch_number_index.is_some() {
                row[batch_number_index.unwrap()]
                    .to_string()
                    .trim()
                    .to_string()
            } else {
                "Empty".to_string()
            };

            let spec = if spec_index.is_some() {
                row[spec_index.unwrap()].to_string().trim().to_string()
            } else {
                "Empty".to_string()
            };

            // count 和 batch_number 都可以为空

            debug!(
                "name: {}, count: {}, validity: {:?}, batch_number: {}, spec: {}",
                name, count, validity, batch_number, spec
            );

            let batch_number = {
                if batch_number == "" {
                    "Empty".to_string()
                } else {
                    batch_number
                }
            };

            let count = {
                if count == "" {
                    "Empty".to_string()
                } else {
                    count
                }
            };

            let medicinal = ImportData {
                name,
                validity: chrono::NaiveDate::from_ymd(
                    validity.year(),
                    validity.month(),
                    validity.day(),
                ),
                count: Some(count),
                batch_number: Some(batch_number),
                spec: Some(spec),
                status: Some("1".to_string()),
            };
            debug!("medicinal: {:#?}", medicinal);
            success_count += 1;
            result_content.push(medicinal);
        }
    }

    debug!(
        "total_count: {}, success_count: {}",
        total_count, success_count
    );

    if category.is_none() {
        error!("category is empty.");
        return Err(anyhow!("category is empty."));
    }

    Ok((category.unwrap(), result_content, total_count, success_count))
}

fn convert_encoding(file: &str, encoding_from: &'static Encoding, encoding_to: &'static Encoding) {
    debug!("convert_encoding file: {}", file);
    match std::fs::read(file) {
        Ok(bytes) => {
            let (string, encoding, has_malformed) = encoding_from.decode(&bytes);
            if encoding != encoding_from {
                println!("^^^^Detected encoding is {}", encoding.name());
            }
            if has_malformed {
                println!("^^^^There are malformed characters");
            } else {
                let (bytes, encoding, has_unmappable) = encoding_to.encode(&string);
                if encoding != encoding_to {
                    println!("^^^^Saved encoding is {}", encoding.name());
                }
                if has_unmappable {
                    println!("^^^^There are unmappable characters");
                }
                std::fs::write(file, bytes).unwrap_or_else(|err| {
                    println!("^^^^write error: {}", err);
                });
            }
        }
        Err(err) => {
            println!("^^^^read error: {}", err);
        }
    }
}

fn remove_whitespace(s: &str) -> String {
    s.chars().filter(|c| !c.is_whitespace()).collect()
}


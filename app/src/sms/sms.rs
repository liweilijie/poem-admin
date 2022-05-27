use crate::sms::send::NotifySms;
use anyhow::Result;
use chrono::Timelike;
use std::sync::Arc;
use tokio::time;
use tokio::time::{Duration, Instant};
use tracing::{debug, error, warn};
use db::{DB, db_conn};
use db::his::entities::medicinal;
use db::his::models::medicinal::Resp;
use crate::apps::his::service;
use crate::apps::his::service::his_medicinal;

pub const EXPIRED_DAYS: i64 = 30;
const INTERVAL_SECONDS: u64 = 1200;
const INTERVAL_SCHEDULE_SECONDS: u64 = 120;

// 利用tokio后台启动一个定期任务
// 定期扫描medicinal表之中没有被删除,并且已经过期或者即将过期的药品,并且发送短信通知
pub async fn do_work(notify_state: Arc<NotifySms>) -> Result<()> {
    let db = DB.get_or_init(db_conn).await;
    // 查询已经过期的药品,马上发送短信
    let mut ids: Vec<u32> = Vec::new();
    let expired_medicinal = his_medicinal::get_lose_validity(db, "0").await?;
    for item in &expired_medicinal {
        warn!("药品已经过期,发送短信通知: {:?}", item);
        send(item, notify_state.clone(), "已经过期药品").await;
        ids.push(item.id);
    }

    // 24小时后的时间
    let after24hours = chrono::Local::now()
        .checked_add_signed(chrono::Duration::hours(24)).unwrap().naive_local();

    if ids.len() > 0 {
        // 更新notify_at时间
        match his_medicinal::update_notify_at(db, after24hours, ids).await {
            Ok(_) => {}
            Err(e) => {
                error!("更新notify_at时间失败: {}", e);
            }
        }
    }

    // 查询即将过期的药品
    let mut ids = Vec::new();
    let expired_medicinal = his_medicinal::get_lose_validity(db, "1").await?;
    for item in &expired_medicinal {
        warn!("药品即将(30天)过期,发送短信通知: {:?}", item);
        send(
            item,
            notify_state.clone(),
            &format!("30天将过期药品"),
        )
        .await;
        ids.push(item.id);
    }

    if ids.len() > 0 {
        // 更新notify_at时间
        match his_medicinal::update_notify_at(db, after24hours, ids).await {
            Ok(_) => {}
            Err(e) => {
                error!("更新notify_at时间失败: {}", e);
            }
        }
    }

    Ok(())
}

pub async fn sms_schedule() {
    // 从现在开始, 每一个小时做一次任务
    // https://rust-book.junmajinlong.com/ch100/03_use_tokio_time.html
    let start = Instant::now();
    // 创建定时器
    let mut interval = time::interval_at(start, Duration::from_secs(INTERVAL_SCHEDULE_SECONDS)); // 2分钟看一次

    // 同步第个药品的状态
    let mut last_scan_status = chrono::Local::now();

    // 数据库句柄
    let db = DB.get_or_init(db_conn).await;
    let _ = service::his_medicinal::medicinal_validity_scan(db).await.map_err(|e| error!("medicinal validity scan error:{}", e));

    // 初始化短信发送任务
    let notify_state = Arc::new(NotifySms::new());

    loop {
        // 每隔一段时间后台去同步一次数据
        if last_scan_status.checked_add_signed(chrono::Duration::seconds(300)).unwrap().gt(&chrono::Local::now()) {
            debug!("do medicinal validity.");
            let db = DB.get_or_init(db_conn).await;
            let _ = service::his_medicinal::medicinal_validity_scan(db).await.map_err(|e| error!("medicinal validity scan error:{}", e));
            last_scan_status = chrono::Local::now();
        }

        // 如果时间在[8-18]点这个区间，则不进行报警，以免影响休息
        if chrono::Local::now().hour() >= 18 || chrono::Local::now().hour() < 8 {
            debug!(
                "now:{} is holiday time, so do sleep",
                chrono::Local::now().hour()
            );
        } else {
            let _ = do_work(notify_state.clone()).await;
        }
        interval.tick().await;
    }
}

async fn send(item: &Resp, notify_state: Arc<NotifySms>, msg: &str) {
    // 构建发送短信的内容
    let p = aliyun_sdk::SmsParam {
        name: format!(
            "{}:{}({})",
            msg, &item.name, item.category_name
        ),
        code: format!("有效期:{}", item.validity.format("%Y-%m-%d")),
    };

    let sms = aliyun_sdk::SmsRequest {
        phones: notify_state.phones.clone(),
        sign_name: notify_state.sign_name.clone(),
        template_code: notify_state.template_code.clone(),
        out_id: Some("123".to_string()),
        param: p,
    };

    notify_state
        .tx
        .clone()
        .send(sms)
        .map_err(|e| {
            error!("发送短信失败: {}", e);
        })
        .ok();
}

mod tests {

    #[test]
    fn test_time_format_with_zone() {
        let now = chrono::Local::now();
        let now_str = now.to_rfc3339(); // 2022-03-29T14:30:37.386513327+08:00
        println!("now_str: {}", now_str);
    }
}

//! 发送短信的模块，包含发送短信的接口

use tokio::sync::mpsc::UnboundedSender;
use tracing::info;

pub struct NotifySms {
    pub template_code: String,
    pub sign_name: String,
    pub phones: Vec<String>,
    pub tx: UnboundedSender<aliyun_sdk::SmsRequest<aliyun_sdk::SmsParam>>,
}

impl NotifySms {
    pub fn new() -> Self {
        let (tx, mut rx) =
            tokio::sync::mpsc::unbounded_channel::<aliyun_sdk::SmsRequest<aliyun_sdk::SmsParam>>();

        let sms_client = aliyun_sdk::Client::new(
            "LTAI5t6SBdCNdURqbD4jumaM".to_string(),
            "MSevUswTfVxwKaayJad5iGAe9lKfzJ".to_string(),
        );

        // 启动一个任务去接收需要发送的短信，并且发送短信
        tokio::spawn(async move {
            while let Some(sms_request) = rx.recv().await {
                info!(
                    "send sms request name(code) {}({})",
                    &sms_request.param.name, &sms_request.param.code
                );
                let sms_response = sms_client.send_sms(sms_request).await;
                info!("send sms response {:?}", sms_response);
            }
        });

        // 返回发送短信的环境, 供外部构建短信的消息使用
        Self {
            template_code: "SMS_235793799".to_string(),
            sign_name: "恒乐淘".to_string(),
            phones: vec!["18280835550".to_string(), "18180815129".to_string()],
            tx,
        }
    }
}

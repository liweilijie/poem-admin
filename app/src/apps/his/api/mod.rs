mod his_medicinal;
mod his_category;

use poem::{delete, get, post, put, Route};

pub fn his_api() -> Route {
    Route::new()
        .nest("/medicinal", medicinal_api()) // 药品模块
        .nest("/category", category_api()) // 药品模块
}

fn medicinal_api() -> Route {
    Route::new()
        .at("/list", get(his_medicinal::get_sort_list)) // 获取筛选分页
        .at("/get_all", get(his_medicinal::get_all)) // 获取筛选分页
        .at("/get_by_id", get(his_medicinal::get_by_id)) // 按id获取
        .at("/add", post(his_medicinal::add)) // 添加
        .at("/edit", put(his_medicinal::edit)) // 更新
        // .at("/delete", delete(sys_post::delete)) //软删除
        .at("/delete", delete(his_medicinal::delete)) // 硬删除
}

fn category_api() -> Route {
    Route::new()
        .at("/list", get(his_category::get_sort_list)) // 获取筛选分页
        .at("/get_all", get(his_category::get_all)) // 获取筛选分页
        .at("/get_by_id", get(his_category::get_by_id)) // 按id获取
        .at("/add", post(his_category::add)) // 添加
        .at("/edit", put(his_category::edit)) // 更新
        // .at("/delete", delete(sys_post::delete)) //软删除
        .at("/delete", delete(his_category::delete)) // 硬删除
}

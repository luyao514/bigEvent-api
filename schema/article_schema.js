const joi = require('@hapi/joi')

// 定义标题、分类ID、内容、发布状态的验证规则
const title = joi.string().required();
const cate_id = joi.number().integer().min(1).required();
const content = joi.string().allow('').required();
const state = joi.string().valid('已发布', '草稿').required();

// 验证规则对象 --发布文章
module.exports.add_cate_schema = {
    body: {
        title,
        cate_id,
        content,
        state
    }
}
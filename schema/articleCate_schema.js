const joi = require('@hapi/joi')

// 定义分类名称和分类别名的校验规则
const name = joi.string().required();
const alias = joi.string().alphanum().required();

// 定义删除文章分类id的校验规则
const id = joi.number().integer().min(1).required();

// 校验规则对象 --添加分类
module.exports.addArticleCate_schema = {
    body: {
        name, 
        alias
    }
}

// 校验规则对象 --删除文章分类
module.exports.deleteCate_schema = {
    params: {
        id
    }
}

// 校验规则对象 --根据id获取文章分类
module.exports.getArticleCateById_schema = {
    params: {
        id
    }
}

// 校验规则对象 --根据id更新文章分类
module.exports.updateCate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}
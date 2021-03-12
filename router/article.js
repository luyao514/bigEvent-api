// 文章的路由模块

const express = require('express')
const router = express.Router();

// 导入multer和path
const multer = require('multer')
const path = require('path')

// 创建multer的实例: dest属性指向文件的存放路径
const uploads = multer({
    dest: path.join(__dirname, '../uploads')
})

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章的验证规则模块
const {add_cate_schema} = require('../schema/article_schema')

// 导入文章路由处理函数
const article_handler = require('../router_handler/article_handler')

// 发布新文章路由
router.post('/add', uploads.single('cover_img'), expressJoi(add_cate_schema), article_handler.addArticle)

module.exports = router
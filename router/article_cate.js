const express = require('express')
const router = express.Router();

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入校验规则
const {addArticleCate_schema, deleteCate_schema, getArticleCateById_schema, updateCate_schema} = require('../schema/articleCate_schema')

// 文章分类路由处理函数模块
const article_cate_handler = require('../router_handler/article_cate_handler')

// 获取文章分类列表数据路由
router.get('/cates', article_cate_handler.getArticleCates)
// 新增文章分类路由
router.post('/addcates',expressJoi(addArticleCate_schema) , article_cate_handler.addArticleCate)
// 删除文章分类路由
router.get('/deletecate/:id',expressJoi(deleteCate_schema), article_cate_handler.deleteCate)
// 根据id获取文章分类路由
router.get('/cates/:id',expressJoi(getArticleCateById_schema), article_cate_handler.getArticleCateById)
// 根据id更新文章分类路由
router.post('/updatecate', expressJoi(updateCate_schema) ,article_cate_handler.updateCateById)

module.exports = router
// 路由映射关系模块
const express = require('express')
const router = express.Router();

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user_handler')

// 导入验证数据表单的中间件
const expressJoi = require('@escook/express-joi')
// 导入验证规则对象
const {reg_login_schema} = require('../schema/user_schema')

// 注册用户路由
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)

// 登录路由
router.post('/login', expressJoi(reg_login_schema), userHandler.login)


module.exports = router
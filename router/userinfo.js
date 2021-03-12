const express = require('express')
const router = express.Router();

// 导入获取用户信息处理函数模块
const userinfo_handler = require('../router_handler/userinfo_handler.js')
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入更新用户信息验证规则对象
const {update_userinfo_schema, update_pwd_schema, update_avatar_schema} = require('../schema/user_schema')
// 导入重置密码验证规则对象

// 获取用户信息路由
router.get('/userinfo', userinfo_handler.getUserinfo)
// 更新用户信息路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserinfo)
// 重置密码路由
router.post('/updatepwd', expressJoi(update_pwd_schema), userinfo_handler.updatePwd)
// 更换头像路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

module.exports = router
// 用户信息验证规则模块
const joi = require('@hapi/joi')

// 用户名验证规则
const username = joi.string().alphanum().min(1).max(10).required();
// 密码验证规则
const password = joi.string().pattern(/^[\S]{6,15}$/).required()

// 定义id, nickname, email的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

// 定义重置密码的验证规则
const oldPwd = password;
// 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
// 解读：
// 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
// 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
// 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
const newPwd = joi.not(joi.ref('oldPwd')).concat(password)

// 定义用户头像的验证规则
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required();

// 定义验证注册和登录表单数据的规则对象
module.exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

// 向外共享更新用户信息的验证规则对象
module.exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

// 向外共享重置密码的验证规则对象
module.exports.update_pwd_schema = {
    body: {
        oldPwd,
        newPwd
    }
}

// 向外共享更新头像的验证规则对象
module.exports.update_avatar_schema = {
    body: {
        avatar
    }
}
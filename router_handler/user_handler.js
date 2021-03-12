// 路由处理函数模块

// 导入数据库连接对象模块
const db = require('../db/index')
// 导入bcryptjs模块
const bcrypt = require('bcryptjs')
// 导入jsonwebtoken模块
const jwt = require('jsonwebtoken')
// 导入config.js
const config = require('../config')

module.exports.regUser = (req, res) => {
    // 接受表单数据
    const userInfo = req.body;
    // 判断用户名和密码是否为空
    // if (!userInfo.username || !userInfo.password) {
    //     /* return res.send({
    //         status: 1,
    //         message: '用户名或密码不能为空！'
    //     }) */
    //     return res.cc('用户名或密码不能为空！')
    // }
    // 判断用户名是否已经存在
    const sqlStr = 'select * from users where username=?'
    db.query(sqlStr, userInfo.username, (err, results) => {
        // 执行sql语句失败
        if (err) return res.cc(err.message);
        // 用户名被占用
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名!')
        }
        // 用户名可用
        // 调用bcrypt.hashSync()方法，对注册用户的密码，进行bcypt加密，返回值是加密之后的密码字符串
        userInfo.password = bcrypt.hashSync(userInfo.password, 10);
        // 注册用户
        const sqlStr = 'insert into users set ?'
        db.query(sqlStr, {
            username: userInfo.username,
            password: userInfo.password
        }, (err, results) => {
            // 执行sql语句失败
            if (err) return res.cc(err.message)
            // 执行sql语句成功
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败！,请稍后再试!')
            }
            // 注册成功
            res.cc('用户注册成功！', 0)
        })
    })
}
module.exports.login = (req, res) => {
    // 根据用户名查询用户的数据
    const userInfo = req.body;
    const sqlStr = 'select * from users where username=?'
    db.query(sqlStr, userInfo.username, (err, results) => {
        // sql语句失败
        if (err) return res.cc(err)
        // sql语句成功
        // 没有该用户的数据
        if (results.length !== 1) {
            return res.cc('该用户不存在！')
        }
        // 存在该用户的数据，判断用户输入的密码与数据库的密码是否一致
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password);
        if (!compareResult) return res.cc('密码不正确!')
        // 密码正确，生成token并发送给客户端
        // 提出密码和用户头像等敏感信息
        const user = {...results, password: '', user_pic: ''};
        // 对用户的信息按照密钥进行加密，生成token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn});
        // 响应给客户端
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr
        })

    })
}
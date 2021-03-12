// 用户信息路由处理函数模块

// 导入数据库连接对象
const db = require('../db')
// 导入密码加密模块
const bcrypt = require('bcryptjs')

// 向外暴露获取用户信息处理函数
module.exports.getUserinfo = (req, res) => {
    const sqlStr = 'select id, username, nickname, email, user_pic from users where id=?'
    db.query(sqlStr, req.user[0].id, (err, results) => {
        // 执行sql语句失败
        if (err) return res.cc(err)
        // 执行sql语句成功，但是查询到的数据条数不等于1
        if (results.length !== 1) {
            return res.cc('获取用户信息失败！')
        }
        //  查询成功
        res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results[0]
        })

    })
}
// 向外暴露更新用户信息处理函数
module.exports.updateUserinfo = (req, res) => {
    const sqlStr = 'update users set ? where id=?'
    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
        // sql语句执行失败
        if (err) return res.cc(err)
        // sql语句执行成功,但是影响行数不为1
        if (results.affectedRows !== 1) return res.cc('修改用户信息失败!')
        res.cc('修改用户信息成功!', 0)
    })
}
// 向外共享重置密码处理函数
module.exports.updatePwd = (req, res) => {
    // 密码校验通过之后
    // 根据id判断用户是否存在
    const sqlStr = 'select * from users where id=?'
    db.query(sqlStr, req.user[0].id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('该用户不存在！')
        // 用户存在，判断输入的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);
        if (!compareResult) return res.cc('原密码错误!')
        // 原密码输入正确，对新密码进行bcrypt加密之后，更新到数据库中
        const sqlStr = 'update users set password=? where id=?';
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sqlStr, [newPwd, req.user[0].id], (err, results) => {
        // sql语句执行失败
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新密码失败！')
            res.cc('更新密码成功!', 0)
        })
    })
}
// 向外共享更新头像处理函数
module.exports.updateAvatar = (req, res) => {
    const sqlStr = 'update users set user_pic=? where id=?'
    db.query(sqlStr, [req.body.avatar, req.user[0].id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新用户头像失败！')
        res.cc('更新用户头像成功!', 0)
    })
}
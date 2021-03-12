

// 导入path模块
const { read } = require('fs')
const path = require('path')
const db = require('../db')

module.exports.addArticle = (req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数')
    // 处理文章的信息对象
    const articleInfo = {
        ...req.body,
        // 文章封面的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 发布时间
        pub_date: Date.now(),
        // 文章作者的id
        author_id: req.user[0].id,
    }
    const sqlStr = 'insert into articles set ?';
    db.query(sqlStr, articleInfo, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('发布文章失败!')
        res.cc('发布文章成功!', 0)
    })
}
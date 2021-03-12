const db = require("../db");

// 向外共享获取文章分类路由处理函数
module.exports.getArticleCates = (req, res) => {
    const sqlStr = 'select * from article_cate where is_delete!=1 order by id asc';
    db.query(sqlStr, (err, results) => {
        if (err) res.cc(err)
        if (results.length === 0) return res.cc('获取文章分类列表失败！')
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results
        })
    })
}

// 向外共享新增文章分类路由处理函数
module.exports.addArticleCate = (req, res) => {
    // 表单数据经过expressJoi中间件验证成功后，判断name和alias是否已存在
    // 这些代码不需要，在数据库中name和alias字段都是unique，不能重复
    // const sqlStr = 'select * from article_cate where name=? or alias=?';
    // db.query(sqlStr, [req.body.name, req.body.alias], (err, results) => {
    //     if (err) return res.cc(err)
    // // 分类名和分类名称都被占用
    // if (results.length === 2) res.cc('分类名称和别名被占用，请更换后重试！')
    // if (results.length === 1 && results.name === req.body.name && results.alias === req.body.alias) return res.cc('分类名称和别名被占用，请更换后重试！')
    // // 分类名或分类名称被占用
    // if (results.length === 1 && results.name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    // if (results.length === 1 && results.alias === req.body.alias) return res.cc('别名被占用， 请更换后重试')
    // 新增文章分类
    const sqlStr = 'insert into article_cate set ?';
    db.query(sqlStr, {name: req.body.name, alias: req.body.alias}, (err, results) => {
        // sql语句执行失败或分类名称、别名其一被占用
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('新增文章分类失败!')
        res.cc('新增文章分类成功！', 0)
    })
    // })
}

// 向外共享删除文章分类路由处理函数
module.exports.deleteCate = (req, res) => {
    // 定义标记删除的sql语句
    const sqlStr = 'update article_cate set is_delete=1 where id=?'
    db.query(sqlStr, req.params.id, (err, results) => {
        // sql语句执行失败
        if (err) return res.cc(err)
        // sql语句执行成功， 但是影响行数不等于1
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
        res.cc('删除文章分类成功！', 0)
    })
}

// 向外共享根据id获取文章分类路由处理函数
module.exports.getArticleCateById = (req, res) => {
    const sqlStr = 'select * from article_cate where id=?'
    db.query(sqlStr, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类数据失败!') 
        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results[0]
        })
    })
}

// 向外共享根据id更新文章分类数据路由处理函数
module.exports.updateCateById = (req, res) => {
    // 执行查重操作
    const sqlStr = 'select * from article_cate where id!=? and (name=? or alias=?)'
    db.query(sqlStr, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
    
        // 分类名称 和 分类别名 都被占用
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        // 分类名称 或 分类别名 被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')
    
        // TODO：更新文章分类
        const sqlStr = 'update article_cate set ? where Id=?';
        db.query(sqlStr, [{name: req.body.name, alias: req.body.alias}, req.body.Id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新分类信息失败！')
            res.cc('更新分类信息成功!', 0)
        })
    })
    
}
// 导入mysql模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin123',
    database: 'big_event'
})

// 向外共享db数据库连接对象
module.exports = db
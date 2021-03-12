//1.导入express模块
const express = require('express')
//2.创建服务器实例
const app = express();
// 3.导入定义验证规则的模块
const joi = require('@hapi/joi')


// 导入并注册cors中间件
const cors = require('cors')
app.use(cors())

// 托管静态资源
app.use('/uploads', express.static('./uploads'))

// 配置解析表单数据的中间件 解析application/x-www-form-urlencoded格式的数据
app.use(express.urlencoded({extended: false}))

// 注册中间件，封装res.cc函数（响应内容给客户端）
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message: err
        })
    }
    next();
})

// 导入解析token的express-jwt中间件
const expressJWT = require('express-jwt')
// 导入配置文件
const config = require('./config')
// 在注册路由之前配置解析token的中间件
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 导入并注册用户路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);

// 导入并注册个人中心模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 导入并注册文章类别模块
const articleCateRouter= require('./router/article_cate')
app.use('/my/article', articleCateRouter)

// 导入并注册文章模块
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)

// 注册错误级别中间件
app.use((err, req, res, next) => {
    // 数据验证失败
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    // 身份认证失败
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知错误
    res.cc(err)
    next();
})

//3.启动服务器
app.listen(3007, () => {
    console.log('server running at http://127.0.0.1:3007')
})
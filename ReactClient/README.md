# npm install 下载依赖
#	npm start	运行项目



# 项目目录结构
#   bin   运行的目录   
##    www  可以同时链接多个数据库

# config 
##    mongodb_.js 对 mongoDB 的操作封装
##    use.js  使用说明

# db
##    react-admin.js  连接 react-admin 的数据库

# public 静态文件
##    image 文件是上传图片的文件（会出现过多无用的图片）
##    stylesheets 没用

# routes 存放的连接 react-admin 数据库接口      接口路由和实现的逻辑

# utils 存放的是一些公共方法
##    muterUtils.js 上传图片的方法

# api.js 添加的中间件和跨域设置请求的路由
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require("fs");

var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category');
var productRouter = require('./routes/product');
var roleRouter = require('./routes/role');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);  
app.use('/manage/category', categoryRouter);   
app.use('/manage/product', productRouter);
app.use('/manage/role', roleRouter);   
app.use('/manage/user', userRouter); 


//  解决 BrowserRouter 路由刷新会出现 404 的问题   必须写到  路由后面
// app.use((req, res) => {
//   fs.readFile(__dirname + "/public/index.html", (err, data) => {
//     if(err) {
//       console.log(err);
//       res.send("后台报错");
//     } else {
//       res.writeHead(200, {
//         "Content-type": "text/html; charset=utf-8"
//       })
//       res.end(data);
//     }
//   })
// })


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

module.exports = app;

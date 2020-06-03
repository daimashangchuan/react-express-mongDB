const express = require('express');
const router = express.Router();
const md5 = require('blueimp-md5')
const { UserModel, roleModel } = require('../db/react-admin')
const jwt = require('jsonwebtoken');
const filter = { password: 0, __v: 0 } // 过滤掉查询时不需要的属性数据


/**
 * 获取用户列表
 */
router.post('/list', function (req, res) {
  UserModel.find((error, userDoc) => {
    const users = [];
    userDoc.map((user) => {
			if(!(user.type==="maximum" && user.role_id === "0")) {
        users.push(user);
      }
		})
    if(userDoc) {
      roleModel.find((err,roleDoc) => {
        if(roleDoc) {
          // res.send({ code: 0, msg: '获取列表成功', users: userDoc, roles: roleDoc });
          res.send({ code: 0, msg: '获取列表成功', users, roles: roleDoc });
        } else {
          res.send({code: 1, msg: '获取列表失败',data:null});
        }
      })
    } else {
      res.send({code: 1, msg: '获取列表失败',data:null});
    }  
  })
})

/**
 * 删除用户
 */
router.post('/delece', function (req, res) {
  const { userId } = req.body;  
  console.log(userId);
  UserModel.remove({ _id: userId  },(error) => {
    if(!error) { 
      res.send({code: 0, msg: "删除成功！"})
    } else {
      res.send({code: 1, msg: '删除失败！'})
    }
  })
})

/**
 * 添加用户
 */
router.post('/add', function (req, res) {
  const { username, password, phone, email, role_id, roleName } = req.body
  const create_time = new Date().getTime();
  const type = "minimum";
  UserModel.findOne({username}, (error, usersDoc) => {
    if(usersDoc) {
      res.send({code: 1, msg: '此用户已存在, 请重新注册'})
    } else {
      let content ={email}; 
      let secretOrPrivateKey=phone+password
      let token = jwt.sign(content, secretOrPrivateKey, { expiresIn: 60*60*1 });
      token = token.substring(token.length-30);
      new UserModel({username, password: md5(password), phone, email, token, type, role_id, create_time,roleName}).save((error, userDoc) => {
        res.json({ code: 0, msg: '注册成功', data: userDoc,userId: userDoc._id })
      })
    }
  })
})

/**
 * 更新用户
 */
router.post('/updata', function (req, res) {
  const { username, phone, email, role_id, roleName, _id } = req.body
  UserModel.findByIdAndUpdate({ _id }, { username, phone, email, role_id, roleName }, (error, usersDoc) => {
    if(usersDoc) {// 有数据
      res.send({code: 0, msg: "更新用户信息成功", data: usersDoc});
    } else {// 没有数据
      res.send({code: 1, msg: '更新用户信息失败'});
    }
  })
})

  
module.exports = router;
  
  // router.post('/manage/user/add', function (req, res) {
  //   // 1. 获取请求参数
  //   const {username, password, phone, email} = req.body
  //   // 2. 处理: 根据username查询users集合, 如果没有, 直接返回了一个失败的提示数据, 如果有, 保存, 完成后返回一个成功的信息
  //   UserModel.findOne({username}, (error, userDoc) => {
  //     if(userDoc) {// 此用户已存在
  //       // 3. 返回响应(失败)
  //       res.send({code: 1, msg: '此用户已存在, 请重新注册'})
  //     } else {// 此用户不存在 , 可以注册
  //       let content ={username}; // 要生成token的主题信息
  //       let secretOrPrivateKey=email // 这是加密的key（密钥） 
  //       let token = jwt.sign(content, secretOrPrivateKey, {
  //           expiresIn: 60*60*1  // 1小时过期
  //       });
  //       token = token.substr(0,25);
  //       new UserModel({username, password: md5(password), phone, email,token}).save((error, userDoc) => {
  //         // 向浏览器返回一个cookie数据(实现注册成功后自动登陆了)
  //         // res.cookie('REACTTOKEN', token, {maxAge: 1000*60*60*24*7})
  //         // 3. 返回响应(成功)
  //         res.json({code: 0, msg: '注册成功', data: {token, username, phone, email,_id:userDoc._id}})
  //       })
  //     }
  //   })
  // })
  
  
  
  // // 2. 登陆的路由
  // router.post('/login', function (req, res) {
  //   const {username, password} = req.body
  //   // 根据username和password查询users集合, 如果有对应的user, 返回成功信息, 如果没有返回失败信息
  //   UserModel.findOne({username, password: md5(password)}, filter, (error, userDoc) => {
  //     if(userDoc) { // 成功
  //       // 向浏览器返回一个cookie数据(实现7天免登陆)
  //       res.cookie('REACTTOKEN', userDoc.token, {maxAge: 1000*60*60*24*7})
  //       res.send({code: 0, msg: "登录成功", data: userDoc})
  //     } else { // 失败
  //       res.send({code: 1, msg: '用户名或密码错误!'})
  //     }
  //   })
  // })
  
  // // 3. 更新用户路由
  // router.post('/update', function (req, res) {
  //   // 得到请求cookie的userid
  //   const userid = req.cookies.userid
  //   if(!userid) {// 如果没有, 说明没有登陆, 直接返回提示
  //       return res.send({code: 1, msg: '请先登陆'});
  //   }
  
  //   //更新数据库中对应的数据
  //   UserModel.findByIdAndUpdate({_id: userid}, req.body, function (err, user) {// user是数据库中原来的数据
  //     const {_id, username, type} = user
  //     // node端 ...不可用
  //     // const data = {...req.body, _id, username, type}
  //     // 合并用户信息
  //     const data = Object.assign(req.body, {_id, username, type})
  //     // assign(obj1, obj2, obj3,...) // 将多个指定的对象进行合并, 返回一个合并后的对象
  //     res.send({code: 0, data})
  //   })
  // })
  
  
  // // 根据cookie获取对应的user
  // router.get('/user', function (req, res) {
  //   // 取出cookie中的userid
  //   const userid = req.cookies.userid
  //   if(!userid) {
  //     return res.send({code: 1, msg: '请先登陆'})
  //   }
  
  //   // 查询对应的user
  //   UserModel.findOne({_id: userid}, filter, function (err, user) {
  //     if(user) {
  //       return res.send({code: 0, data: user})
  //     } else {// cookie中的userid不正确
  //       res.clearCookie('userid')  // 删除不正确cookie数据
  //       return res.send({code: 1, msg: '请先登陆'})
  //     }
  //   })
  // })
  
  // /*
  // 查看用户列表(指定类型的)
  //  */
  // router.get('/userlist',function(req, res){
  //   const { type } = req.query
  //   UserModel.find({type},filter, function(err,users){
  //     return res.json({code:0, data: users})
  //   })
  // })
  
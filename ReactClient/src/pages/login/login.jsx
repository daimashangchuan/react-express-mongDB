/**
 * 登录组件
 */

import React, { Component } from "react";
import { Redirect } from 'react-router-dom'

import { Form, Icon, Input, Button, message } from 'antd';

import { UserServise } from "../../servise"
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import cookieUtils from "../../utils/cookiesUtils"

import './login.less';
import logo from './images/indext.jpg'


class Login extends Component {
	
	/**
	 * 注册事件
	 */
	registerClick = async () => {
		const result = await UserServise.reqRegister({
			username:'admin', password:'1889686', phone:"18847139686",
			email:"941076242@qq.com", role_id: "0", roleName:"0",
		})
		// const result = await UserServise.reqRegister({
		// 	username:'react', password:'000000', phone:"15548488585", roleName:"测试001",
		// 	email:"react@qq.com", role_id: "5de4ceea9166d6055cfc571b",
		// })
		message.success(result.msg);
	}
	handleSubmit = (event) =>{
		//  阻止事件的默认行为
		event.preventDefault();

		// 得到验证对象
		const form = this.props.form;
		form.validateFields(async (err, values) => {
			// 验证成功
			if (!err) {
				const result = await UserServise.reqLogin({
					username: values.username,
					password: values.password
				});
				message.success(result.msg);
				if(result.code === 0) {
					cookieUtils.setCookie('REACTTOKEN', result.data.token, {maxAge: 1000*60*60*24})
					if(result.data.role) {
						result.data.user.role = result.data.role
						//  保存到内存中去
						memoryUtils.user = result.data.user;
						//  保存到 localStorage 中去
						storageUtils.setUser(result.data.user);		
					} else {
						//  保存到内存中去
						memoryUtils.user = result.data;
						//  保存到 localStorage 中去
						storageUtils.setUser(result.data);
					}
					this.props.history.replace('/home');
				}
			}
		});
		// const values = form.getFieldsValue();
		// console.log('得到表单输入的值',values);
	}	

	// 对密码进行自定义验证
	validatorPwd = (rule, value, callback) => {
		if(!value) {
			callback('密码不能为空'); // 验证失败指定文本
		} else if(value.length<=4) {
			callback('密码至少4位!');
		} else if(value.length>=12) {
			callback('密码最多12位!');
		} else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
			callback('密码必须是英文，数字或下划线组成!');
		} else {
			callback();	// 验证通过
		}
	}

	render() {
		// 如果用户已经登录
		const user = storageUtils.getUser();
		if(user && user._id) {
			return <Redirect to="/" />
		}

		// 得到验证对象
		const { getFieldDecorator } = this.props.form;
		return (
			<div className='login'>
				<header className='login-header'>
					<img src={logo} alt="logo" />
					<h1>React项目：后天管理系统</h1>
				</header>
				<section className='login-content'>
					<h2>用户登录</h2>
					<Form onSubmit={this.handleSubmit} className="login-form">
							<Form.Item>
								{
									/**
									 * 1.前台表单验证
									 * 	必须输入	
									 * 	必须大于/等于4位
									 * 	必须小于/等于12位  
									 * 	必须是英文，数字或下划线组成
									 */
								}
								{getFieldDecorator('username', {
									rules: [
										{ required: true, whitespace: true, message: '用户名输入不能为空!' },
										{ min: 4, message: '用户名至少4位!' },
										{ max: 12, message: '用户名最多12位!' },
										{ pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字或下划线组成!' }
									],
								})(
									<Input
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="用户名" />,
								)}
							</Form.Item>
							<Form.Item>
								{getFieldDecorator('password', {
									rules: [
										{ validator: this.validatorPwd }
									],
								})(
									<Input
									prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
									type="password" placeholder="密码" />,
								)}
							</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
							</Button>
						</Form.Item>
					</Form>
					{/* <Button onClick={this.registerClick} type="primary" htmlType="submit" className="register-button">
						注册
					</Button> */}
				</section>
			</div>
		)
	}
}

/**
 * 1. 高阶函数
 * 	一类特别的函数
 * 		接受函数类型的参数
 * 		返回的是函数
 * 	常见
 * 		定时器 setTimeout/setInterval
 * 		Promise：Promise(()=>{}).then(value=>{}, reason=>{})
 * 		数组遍历相关的方法：fotEach/filter/map/reduce/find/findIndex
 * 		函数对象的bind()
 * 		Form.create()()/getFieldDecorator
 * 	高阶函数更新动态，更加具有扩展性
 * 
 * 2. 高阶组件
 * 	本质就是一个函数
 * 	接受一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件会向被包装组件传入特定属性
 * 	作用：扩展组件的功能
 * 	高阶组件也是高阶函数：接受一个组件函数，返回是一个新的组件函数
 * 
 */

/**
 *  包装 Form 组件生成一个新的组件：Form(Login)
 * 	新组件会向 Form 组件传递一个强大的对象属性：form
 */

const WrapLogin = Form.create()(Login);

export default WrapLogin



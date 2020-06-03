/**
 * 用户组件
 */

import React, { Component } from 'react';

import { Card, Button, Table, Modal, message } from "antd";
import LinkButton from "../../components/link-button";
import AddUser from "./add-user";

import { UserServise } from "../../servise"
import  formateUtils from "../../utils/formateUtils.js"
import { pageSize } from "../../utils/contransUntils"


class User extends Component {

	state = {
		users: [],
		roles: [],
		isShow: false,
		loading: false
	}

	initColumns = () => { 
        this.columns = [
            {
              title: '用户名',
			  dataIndex: 'username',
			  key: 'username',
            },{
				title: '邮箱',
				dataIndex: 'email',
				key: 'email',
			},{
				title: '电话',
				dataIndex: 'phone',
				key: 'phone',
			},{
				title: '注册时间',
				dataIndex: 'create_time',
				key: 'create_time',
				render: create_time => formateUtils.formateDate(create_time)
			},{
				title: '所属角色',
				dataIndex: 'roleName',
				key: '_id',
		  	},{
                title: '操作',
				width:300,
                render: (user) => {
                    return (
                        <span>  
                            <LinkButton onClick={ () => this.shouUpdata(user) }>修改</LinkButton>
                            <LinkButton onClick={ () => this.deleceUser(user) }>删除</LinkButton>
                        </span>
                    )
                },
            },
		];
	}

	/**
	 * 添加用户和修改用户的确认按钮
	 */
	addOrUpdataUser = async () => {
		// 收集数据
		const form = this.form;
		form.validateFields(async (err, user) => {
			// 验证成功
			if (!err) {
				// if(user.role_id === that.user.roleName) {
				// 	user.role_id == that.user.role_id;
				// }
				user.roleName = this.initRoleName(user.role_id);
				if(this.user && this.user._id) {
					//  请求修改接口
					user._id = this.user._id;
					const { code, msg } = await UserServise.reqUserUpdata(user);
					message.success(msg);
					if(code === 0) {
						this.form.resetFields();   // 清除痕迹
						this.getUsers();	//  更新显示
						this.setState({ isShow: false });	// 隐藏弹框
					}
				} else {
					//  请求添加接口
					const { code, msg } = await UserServise.reqUserAdd(user);
					//  更新显示
					message.success(msg);
					if(code === 0) {
						this.form.resetFields();
						this.getUsers();
						this.setState({ isShow: false });	
					}
				}
			}
		});
	}

	/**
	 * 传送要修改的数据
	 */
	shouUpdata = (user) => {
		this.user = user;
		this.setState({ isShow: true });
	}

	/**
	 * 获取到 role_id 对应的角色名称
	 */
	initRoleName = (role_id) => {
		const { roles } = this.state;
		const roleName =  roles.find(role => role._id === role_id).name;
		return roleName
	}

	/**
	 * 删除 user 
	 */
	deleceUser = (user) => {
		Modal.confirm({
			title: `确定要删除《${ user.username }》用户吗？`,
			onOk: async () => {
			  const { code, msg } = await UserServise.reqUserDelece(user._id);
			  message.success(msg);
			  if(code === 0) {
				this.getUsers();
			  }
			},
		});
	}

	/**
	 * 获取用户信息和角色信息
	 */
	getUsers = async () => {
		this.setState({ loading: true })
		const { code, roles, users } = await UserServise.reqUserList();
		if(code === 0) {
			this.setState({ users, roles, loading: false })
		}
	}

	/**
	 * 创建用户信息弹框
	 */
	showAdd = () => {
		//  去除保存的 user
		this.user = null;
		const { roles } = this.state;
		if(roles.length !== 0) {
			this.setState({ isShow: true })
		}
	}

	/**
	 * 取下弹窗 添加/修改
	 */
	onCancelHide = () => {
		if(this.form) {
			this.form.resetFields();
		}
		this.setState({ isShow: false })
	}

	componentWillMount() {
		this.initColumns();
	}

	componentDidMount() {
		this.getUsers();
	}

	render() {
		const { users, isShow, loading, roles } = this.state;
		const user = this.user || {}
		const title = <Button type='primary' disabled={ roles.length === 0 } onClick={ this.showAdd }>创建用户</Button>
		return (
			<div>
				<Card title={title}>
                    <Table bordered  rowKey='_id' dataSource={ users } columns={ this.columns } 
                        pagination = {{ defaultPageSize:pageSize }} loading = { loading } ></Table>  
                </Card>
                <Modal title={ user._id?"修改用户":"添加用户" } visible={ isShow }
                  onOk={ this.addOrUpdataUser } onCancel={ this.onCancelHide } >
                    <AddUser user={user} roles={roles} setForm={ form => this.form = form }></AddUser>
                </Modal>
			</div>
		);
	}
}

export default User;

/**
 * 添加用户信息
 */

import React, { PureComponent } from 'react';
import PropTypes from "prop-types";

import { Form, Input, Select } from 'antd'


const Item = Form.Item; 
const { Option } = Select;

class AddUser extends PureComponent {

    static propTypes = {
        //  用来传递form对象的函数
        setForm:PropTypes.func.isRequired,
        //  用来获取上一个页面的数据
        user: PropTypes.object,
        //  获取角色信息列表
        roles: PropTypes.array.isRequired,
    }

    componentWillMount() {
        // 将 from 对象传递给父组件
        this.props.setForm(this.props.form);
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const { roles, user } = this.props;
        // 指定 Form.Item 布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 }
        };
        return (
            <div>
                <Form { ...formItemLayout }>
                    <Item label='用户名'>
                        {
                            getFieldDecorator('username',{
                                initialValue: user.username,
                                rules: [
                                    { required: true, whitespace: true, message: '添加的角色名称不能为空!' },
                                ],
                            })( <Input placeholder='请输入用户名称' /> )
                        }
                    </Item>
                    {/* 密码不能修改 */}
                    {
                        user._id ? null: (
                            <Item label='密码'>
                                {
                                    getFieldDecorator('password',{
                                        initialValue: user.password,
                                        rules: [
                                            { required: true, whitespace: true, message: '添加的密码不能为空!' },
                                        ],
                                    })( <Input type='password' placeholder='请输入密码' /> )
                                }
                            </Item>
                        )
                    }
                    <Item label='手机号'>
                        {
                            getFieldDecorator('phone',{
                                initialValue: user.phone,
                                rules: [
                                    { required: true, whitespace: true, message: '添加的手机号不能为空!' },
                                ],
                            })( <Input placeholder='请输入手机号' /> )
                        }
                    </Item>
                    <Item label='邮箱'>
                        {
                            getFieldDecorator('email',{
                                initialValue: user.email,
                                rules: [
                                    { required: true, whitespace: true, message: '添加的邮箱不能为空!' },
                                ],
                            })( <Input placeholder='请输入邮箱' /> )
                        }
                    </Item>
                    <Item label='角色'>
                        {
                            getFieldDecorator('role_id',{
                                initialValue: user.role_id,
                                rules: [
                                    { required: true, whitespace: true, message: '添加的角色不能为空!' },
                                ],
                            })( <Select placeholder='请选择角色'>
                                    {
                                        roles.map((role,index)=> <Option key={index} value={role._id}>{role.name}</Option>)
                                    }
                                </Select> )
                        }
                    </Item>
                </Form>
            </div>
        );
    }
}


export default Form.create()(AddUser);


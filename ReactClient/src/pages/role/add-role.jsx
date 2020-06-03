/**
 * 创建角色名称
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Form, Input } from 'antd'

const Item = Form.Item;    
class AddForm extends Component {
    static propTypes = {
        //  用来传递form对象的函数
        setForm:PropTypes.func.isRequired,
    }

    componentWillMount() {
        // 将 from 对象传递给父组件
        this.props.setForm(this.props.form);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        // 指定 Form.Item 布局的配置对象
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 }
        };
        return (
            <div>
                <Form  { ...formItemLayout }>
                    <Item label='角色名称'>
                        {
                            getFieldDecorator('name',{
                                initialValue: '',
                                rules: [
                                    { required: true, whitespace: true, message: '添加的角色名称不能为空!' },
                                ],
                            })( <Input placeholder='请输入角色名称' /> )
                        }
                    </Item>
                </Form>
            </div>
        );
    }
}

export default Form.create()(AddForm);
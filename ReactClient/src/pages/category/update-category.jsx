/**
 * 添加分类表单
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Form, Input } from 'antd'

class UpdateCategory extends Component {
    static propTypes = {
        categoryName:PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    }

    componentWillMount() {
        // 将 from 对象
        this.props.setForm(this.props.form);
    }

    render() {
        const { categoryName } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form>
                    <Form.Item>
                        {
                            getFieldDecorator('categoryName',{
                                initialValue: categoryName,
                                rules: [
                                    { required: true, whitespace: true, message: '修改的分类名不能为空!' },
                                ],
                            })( <Input placeholder='请输入分类名称' /> )
                        }
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create()(UpdateCategory);
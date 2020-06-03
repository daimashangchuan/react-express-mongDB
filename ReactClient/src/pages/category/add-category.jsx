/**
 * 添加分类表单
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Form, Select, Input } from 'antd'

const Item = Form.Item;    
const Option = Select.Option;
class AddCategory extends Component {
    static propTypes = {
        setForm:PropTypes.func.isRequired,
        categorys: PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired
    }

    componentWillMount() {
        // 将 from 对象
        this.props.setForm(this.props.form);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { categorys, parentId } =  this.props;
        return (
            <div>
                <Form>
                    <Item>
                        {
                            getFieldDecorator('parentId',{
                                initialValue: parentId
                            })(
                                <Select>
                                    <Option value='0'>一级分类</Option>
                                    {
                                        categorys.map((item,index)=> <Option key={index} value={ item._id }>{ item.name }</Option>)
                                    }
                                </Select>
                            )
                        }
                    </Item>
                    <Item>
                        {
                            getFieldDecorator('categoryName',{
                                initialValue: '',
                                rules: [
                                    { required: true, whitespace: true, message: '添加的分类名不能为空!' },
                                ],
                            })( <Input placeholder='请输入分类名称' /> )
                        }
                    </Item>
                </Form>
            </div>
        );
    }
}

export default Form.create()(AddCategory);
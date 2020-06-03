/**
 * product的添加和更新的子路由
 */

import React, { Component } from 'react';

import { Card, Input, Icon, Cascader, Form, Button, message } from 'antd'
import PicturesWall from './prictures-wall'
import LinkButton from '../../components/link-button'

import { ProducServise } from '../../servise'
import RichTextEditor from "./rich-text-editor"

const { Item } = Form;
const { TextArea } = Input;
class ProductAddUpdata extends Component {

    state = {
        options: [],        // 存放一级分类
    };

    constructor (props) {
        super(props);

        // 创建用来保护 ref 标识的标签对象的容器   相当于注册 ref
        this.pw = React.createRef();
        this.editor = React.createRef();
    }

    /**
     * 改变列表的格式
     */
    initOption = async (categorys) => {
        const options = categorys.map(c => (
            {
                value: c._id,
                label: c.name,
                isLeaf: false,
            }
        ))
        
        // 如果是一个二级分类商品更新
        const { isUpdata, product } = this;
        const { pCategoryId, categoryId } = product;
        if(isUpdata && pCategoryId !== '0') {
            //  获取对应的二级分类列表
            const subCategorys = await this.getCategorys(categoryId);
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            // 找到一级分类上
            const targetOption = options.find( option => option.value === categoryId);
            // 关联到一级options上
            targetOption.children = childOptions;
        }
        //  更新 options 状态
        await this.setState({
            options: [...options]
        })
    }

    /**
     * 获取一级/二级列表接口
     */
    getCategorys = async (parentId) => {
        const result = await ProducServise.reqCategorys({ parentId });
        if(result.code === 0) {
            const categorys = result.data;
            console.log('获取一级/二级名称',result)
            if(parentId === '0') {
                this.initOption(categorys);
            } else {
                return categorys;
            }
        }
        // if(this.isUpdata) {
        //     const result = await ProducServise.reqCategorys({ parentId });
        //     if(result.code === 0) {
        //         const categorys = result.data;
        //         console.log('获取一级/二级名称',result)
        //         if(parentId === '0') {
        //             this.initOption(categorys);
        //         } else {
        //             return categorys;
        //         }
        //     }
        // }
    }

    /**
     * 选中一项加载下一项的回调函数
     */
    loadData = async (selectedOptions) => {
        // 获取点击的一级的对象
        const targetOption = selectedOptions[0];
        // 加载的 loading
        targetOption.loading = true;
        // 根据选中的分类请求二级分类
        const categorys = await this.getCategorys(targetOption.value);
        // 隐藏 loading
        targetOption.loading = false;
        if(categorys && categorys.length > 0) {
            // 关联到当前 options 上
            targetOption.children = categorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
        } else {
            //  当前选中没有二级分类
            targetOption.isLeaf = true; 
        }
        // 跟新 optins 状态
        this.setState({
            options: [...this.state.options]
        })
    };

    /**
     *  验证价格自定义
     */
    validatorPrice = (rule, value, callback)  => {
        if(value*1 > 0) {  
            callback(); // 验证通过
        } else {
            callback('价格必须大于0');
        }
    }

    /**
     * 提交最终的结果
     */
    submit = () => {
        this.props.form.validateFields( async (err,values) => {
            if(!err) {
                const imgs = this.pw.current.getImages();
                const detail = this.editor.current.getDetail();
                // 收集数据
                values.imgs = imgs;
                values.detail = detail;
                values.categoryId = values.categoryIds[0];
                values.pCategoryId = values.categoryIds[1]; 
                console.log('提交的数据',values);
                //  发送请求 添加/修改
                if(this.isUpdata) {
                    values.status = this.product.status;
                    values._id = this.product._id;
                    const { msg, code } = await ProducServise.reqProductUpdata(values);
                    message.success(msg);
                    if(code === 0) { this.props.history.goBack(); }
                } else {
                    values.status = 1;
                    const { msg, code } = await ProducServise.reqProductAdd(values);
                    message.success(msg);
                    if(code === 0) { this.props.history.goBack(); }
                }
            }
        })
    }

    componentWillMount() {
        const { product } = this.props.location.state || {};
        console.log('上一个页面传递过来的参数',product);
        // 保存是否是更新的标识
        this.isUpdata = !!product;
        this.product = product || {};
    }

    componentDidMount() {
        this.getCategorys('0');
    }

    render() {
        const { isUpdata, product } = this; 
        const { pCategoryId, categoryId, imgs, detail } = product;
        const categoryIds = [];
        if(isUpdata && pCategoryId === '0') {
            categoryIds.push(categoryId);    
        } else {
            categoryIds.push(categoryId);
            categoryIds.push(pCategoryId);
        }
        console.log('商品分类',categoryIds);

        const title = (
            <span>
                <LinkButton onClick={ () => this.props.history.goBack() }>
                    <Icon type='arrow-left' style={{ color:'green', marginRight: 18, fontSize: 18 }}></Icon>
                </LinkButton>
                <span>{ isUpdata? '修改商品': '添加商品' }</span>
            </span>
        )

        // 指定 Form.Item 布局的配置对象
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 }
        };

        const { getFieldDecorator } = this.props.form;

        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label='商品名称'>
                        {
                            getFieldDecorator('name', {
                                initialValue: product.name,
                                rules: [{ required: true, message: '必须输入商品名称' }],
                            })(<Input placeholder='请输入商品名称'></Input>)
                        }
                    </Item>
                    <Item label='商品描述'>
                        {
                            getFieldDecorator('desc', {
                                initialValue: product.desc,
                                rules: [{ required: true, message: '必须输入商品描述' }],
                            })(<TextArea placeholder='请输入商品描述' autoSize={{ minRows:3, maxRows:6 }} maxLength="500"></TextArea>)
                        }
                    </Item>
                    <Item label='商品价格'>
                        {
                            getFieldDecorator('price', {
                                initialValue: product.price,
                                rules: [
                                    { required: true, message: '必须输入商品价格' },
                                    { validator: this.validatorPrice }
                                ]
                            })(<Input type='number' addonAfter="元" placeholder='请输入商品价格'></Input>)
                        }
                    </Item>
                    <Item label='商品分类'>
                        {
                            getFieldDecorator('categoryIds', {
                                initialValue: categoryIds,
                                rules: [
                                    { required: true, message: '必须指定商品分类' },
                                ]
                            })(<Cascader options={this.state.options} loadData={this.loadData} placeholder="请选择商品分类" changeOnSelect/>)
                        }
                    </Item>
                    <Item label='商品图片'>
                        <PicturesWall ref={ this.pw } imgs={ imgs }></PicturesWall>
                    </Item>
                    <Item label='商品详情' labelCol={{ span: 2 }} wrapperCol={{ span: 16 }}>
                        <RichTextEditor ref={ this.editor } detail={ detail }></RichTextEditor>
                    </Item>
                    <Item>
                        <Button type='primary' onClick={ this.submit }>提交</Button>
                    </Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create()(ProductAddUpdata);

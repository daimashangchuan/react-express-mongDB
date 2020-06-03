/**
 * product的默认子路由组件
 */

import React, { Component } from 'react';

import { Card, Select, Input, Button, Icon, Table, message, Modal } from 'antd';
import LinkButton from '../../components/link-button';

import { ProducServise } from '../../servise';

import {  pageSize } from '../../utils/contransUntils';

const { confirm } = Modal;
const Option = Select.Option;
class ProductHome extends Component {

    state = {
        pageNum: 1,      // 分页的页数
        count: 0,        // 商品的总数量
        products: [],    // 接受商品的分页列表
        searchName: '',  // 搜索的关键字
        searchType: 'name',
        loading: false
    }

    /**
     * 初始化列表数据
     */
    initColumns = () => {
        this.columns = [{
            width: 130,
            title: '商品名称',
            dataIndex: 'name',
        },{
            title: '商品描述',
            dataIndex: 'desc',
        },{
            width: 120,
            title: '价格',
            dataIndex: 'price', 
            render: (price) => '￥' + price
        },{
            width: 180,
            title: '所属分类',
            dataIndex: 'categoryId', 
            render: (categoryId) => categoryId
        },{
            width: 180,
            title: '状态',
            render: (product) => {
                const { status, _id } = product;    
                const newStatus = status === 1?2:1;
                return (
                    <span>
                        <Button type='primary' onClick={ () => this.getUpdataStatus(newStatus, _id) }>{ status===1?"下架":"上架" }</Button>
                        <span style={{ marginLeft:'20px' }}>{ status===1?"在售":"已下架" } </span>
                    </span>
                )
            }
        },{
            width: 200,
            title: '操作',
            render: (product) => {
                return (
                    // 将 products 对象 使用 state 传递给目标路由组件
                    <span className='pro-oper'>
                        <LinkButton onClick={ () => this.props.history.push('/product/detail', {product}) }>详情</LinkButton>
                        <LinkButton onClick={ () => this.props.history.push('/product/addupdata', {product}) }>修改</LinkButton>
                        <LinkButton style={{ marginRight: 0 }} onClick={ this.productDel }>删除</LinkButton>
                    </span>
                )
            }
        }];
    }

    /**
     * 获取商品列表数据 和 获取搜索商品数据
     */
    getProducts = async (pageNum) => {
        const { searchType, searchName } = this.state;
        this.setState({ loading: true });
        let result;
        if(searchName) {
            //  如果有关键字，说明我们做分页搜索
            result = await ProducServise.reqSearchProducts({ searchType, searchName, pageNum, pageSize });
        } else {
            // 一般分页
            result = await ProducServise.reqProducts({ pageNum, pageSize });
        }
        this.setState({ loading: false });
        if(result.code === 0) {
            this.setState({
                products: result.data,
                count: result.count
            })
        }
    }

    /**
     * 商品列表更新上架/下架的 status 
     */
    getUpdataStatus = async (status, parentId) => {
        const { pageNum } = this.state;
        const { code, msg } = await ProducServise.reqUpdataStatus({ parentId, status });
        if(code === 0) {
            this.getProducts(pageNum)
            message.success(msg);
        }
    }

    /**
     * 删除商品
     */
    productDel() {
        confirm({
            title: "确定要删除吗?",
            okText: "Yes",
            cancelText: "No",
            color: "#1DA57A",
            onOk: () => {
                console.log("删除确定按钮")
            },
            onCancel() {},
        });
    }

    componentWillMount() {
        this.initColumns();   // 初始化 table 列表
    }

    componentDidMount() {
        const { pageNum } = this.state;
        this.getProducts(pageNum);
    }
    
    render() {  
        // 去除 state 的状态
        const { products, count, searchType, pageNum, loading } = this.state;
        const title = (
            <span>
                <Select value={searchType} style={{width: 150}} onChange={ (value) => this.setState({searchType:value}) }>
                    <Option value='name'>按名称搜索</Option>
                    <Option value='desc'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{width: 150, margin: '0 15px'}} 
                    onChange={async (event) => {
                        const val = event.target.value;
                        console.log(val === '');
                        if(val === '') {
                            await this.setState({ searchName:'', pageNum: 1 });
                            this.getProducts(pageNum);
                            console.log('请求数据');
                        } else {
                            this.setState({ searchName:val });
                        }
                    }} />
                <Button onClick={ async () => { await this.setState({ pageNum: 1 }); this.getProducts();  } }>搜索</Button>
            </span>
        );
        const extra = (
            <Button type='primary' onClick={ () => this.props.history.push('/product/addupdata') }>
                <Icon type='plus'></Icon>
                添加商品
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table bordered dataSource={products} columns={this.columns} 
                rowKey='_id'  loading={ loading }
                pagination={{ 
                    defaultPageSize: pageSize, total:count, 
                    showQuickJumper: true, current: pageNum,
                    onChange:(pageNum)=>{ 
                        this.setState({ pageNum });
                        this.getProducts(pageNum); 
                    }
                }} />
            </Card>
        );
    }
}

export default ProductHome;

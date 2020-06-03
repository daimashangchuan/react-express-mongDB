/**
 *  品类管理组件 
 */

import React, { Component } from 'react';

import { Card, Table, Button, Icon, Modal, message, Form } from 'antd';

import LinkButton from '../../components/link-button';
import AddCategory from './add-category';
import UpdateCategory from './update-category'
import { pageSize } from "../../utils/contransUntils"
import { ProducServise } from '../../servise'

import './category.less'

class Category extends Component {
    state = {
        categorys: [],      //  接受一级分类数据
        subCategorys: [],   //  接受二级分类数据
        parentId: '0',      //  记录分类 ID
        parentName: "",     //  记录分类名称
        loading: false,     //  加载数据的 loading
        showStatus: 0   //  控制添加/更新的弹框  0 都不显示  1 显示添加  2 显示更新
    }

    /**
     * 初始化 Table 所有列的数组
     */
    initColumns = () => { 
        this.columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',
            },{
                title: '操作',
                width:300,
                render: (categorys) => {
                    return (
                        <span>  
                            <LinkButton onClick={ () => this.showUpdateModal(categorys) }>修改分类</LinkButton>
                            { 
                                this.state.parentId === '0'? <LinkButton onClick={ () => {this.showSubCategorys(categorys)} }>查看子分类</LinkButton> : ''
                            }
                        </span>
                    )
                },
            },
        ];
    }

    /**
     * 获取一级/二级分类列表
     */
    getCategorys = async () => {
        this.setState({ loading: true });
        const { parentId } = this.state;
        const result = await ProducServise.reqCategorys({ parentId });
        this.setState({ loading: false });
        if(result.code === 0) {
            const categorys = result.data;
            if(parentId === '0') {
                this.setState({ categorys })
            } else {
                this.setState({ subCategorys:categorys })
            }
        }
    }

    /**
     * 获取二级需要的 Id
     */
    showSubCategorys = async (categorys) => {
        await this.setState({
            parentId: categorys._id,
            parentName: categorys.name
        });
        this.getCategorys();
    }

    /**
     * 回到一级分类
     */
    showFirstCategorys = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
    }

    /**
     * 点击显示弹框
     */
    showAddModal = () => {
        this.setState({ parentName: "", showStatus: 1 });
    };
    showUpdateModal = (categorys) => {
        // 保存分类对象
        this.category = categorys;
        this.setState({ showStatus: 2 });
    };
    
    /**
     * 点击弹框取消按钮
     */
    handleCancel = () => {
        this.setState({ showStatus: 0 });
    };

    /**
     * 添加分类
     */
    addCategory = async () => {
        this.form.validateFields( async (err,values) =>{
            if(!err) {
                const { parentId, categoryName } = values;
                const result = await ProducServise.reqAddCategory({ parentId, categoryName });
                message.success(result.msg);
                if (result.code === 0) {
                    // 隐藏弹框
                    this.handleCancel();
                    // 刷新列表
                    this.getCategorys();
                    // 清除输入数据
                    this.form.resetFields();
                }
            }
        })
    };

    /**
     * 更新分类
     */
    updateCategory = () => {
        this.form.validateFields(async (err, values) => {
			// 验证成功
			if (!err) {
				// 发送请求更新分类
                const categoryId = this.category._id;
                const { categoryName } = values;
                const result = await ProducServise.reqUpdateCategory({ categoryId, categoryName });
                message.success(result.msg);
                if(result.code === 0) {
                    // 隐藏弹框
                    this.handleCancel();
                    // 刷新列表
                    this.getCategorys();
                    // 清除输入数据
                    this.form.resetFields();
                } 
			}
		});
    };

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getCategorys();
    }

    render() {  
        const { categorys, loading, parentId, subCategorys, parentName, showStatus } = this.state;  
        // 读取指定的分类
        const  category = this.category || {};
        const title =  parentId === '0'?'一级分类列表':(
            <span>
                <LinkButton onClick={this.showFirstCategorys}>一级分类列表</LinkButton>
                <Icon type='arrow-right'></Icon>
                <span className='parentName'>{ parentName }</span>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={this.showAddModal}>
                <Icon type='plus' />
                添加
            </Button>
        ); 
        return (
            <div className='category'>
                <Card title={title} extra={extra}>
                    <Table bordered  rowKey='_id' dataSource={parentId === '0'? categorys: subCategorys } 
                        columns={this.columns} loading = { loading }
                        pagination = {{ defaultPageSize:pageSize, showQuickJumper:true }}></Table>  
                </Card>
                <Modal title="添加分类" visible={showStatus === 1}
                  onOk={this.addCategory} onCancel={this.handleCancel} >
                    <AddCategory categorys={categorys} parentId={parentId} setForm={ (form) => { this.form = form } }></AddCategory>
                </Modal>
                <Modal title="更新分类" visible={showStatus === 2}
                  onOk={this.updateCategory} onCancel={this.handleCancel} >
                    <UpdateCategory categoryName={ category.name } setForm={ (form) => { this.form = form } } />
                </Modal>
            </div>
        );
    }
}

export default Form.create()(Category);


   

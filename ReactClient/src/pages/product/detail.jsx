/**
 * product的详情子路由
 */

import React, { Component } from 'react';

import { Card, Icon, List } from 'antd'
import LinkButton from '../../components/link-button';

import { BASE_IMG_URL } from '../../utils/contransUntils'
import { ProducServise } from '../../servise'

const Item = List.Item;
class ProductDetail extends Component {
    
    state = {
        cName1: '',     // 一级分类名称
        cName2: ''      // 二级分类名称
    }

    componentDidMount() {
        this.classClick();
    }

    /**
     * 获取分类名称
     */
    classClick = async () => {
        const { categoryId, pCategoryId } = this.props.location.state.product;
        if(pCategoryId === '0') {
            const cateData = await ProducServise.reqProductOne({ categoryId });
            if(cateData.code === 0) {
                this.setState({
                    cName1:cateData.data.name
                })
            }
        } else {
            const results = await Promise.all([
                ProducServise.reqProductOne({ categoryId }),
                ProducServise.reqProductTwo({ pCategoryId })
            ])
            if(results[0].code === 0) {
                this.setState({
                    cName1:results[0].data.name
                })
            }
            if(results[1].code === 0) {
                this.setState({
                    cName2:results[1].data.name
                })
            }
        }
    }

    render() {
        // 读取上一个组件传递过来的数据
        console.log("读取上一个组件传递过来的数据",this.props.location.state.product);
        const { name, desc, price, detail, imgs, status } = this.props.location.state.product;

        const { cName1, cName2 } = this.state;

        const title = (
            <span>
                <LinkButton>
                    <Icon onClick={ () => this.props.history.goBack() } type='arrow-left' style={{ color:'green', marginRight: 18, fontSize: 18 }}></Icon>
                </LinkButton>
                <span style={{ marginRight: 20 }}>商品详情</span> 
                <span style={{ color:'green', fontSize: 14 }}>{ status===1?"在售":"已下架" }</span>
            </span>
        )
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>商品名称:</span>
                        <span>{ name }</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述:</span>
                        <span>{ desc }</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格:</span>
                        <span>{ price }</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类:</span>
                        <span>{ cName1 } -> { cName2 }</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片:</span>
                        <span>
                            {
                                imgs.map((img,index)=>(
                                    <img key={ index } className='pro-img' src={ BASE_IMG_URL + img } alt="img"/>
                                ))
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>商品详情:</span>
                        <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                    </Item>
                </List>
            </Card>
        );
    }
}

export default ProductDetail;

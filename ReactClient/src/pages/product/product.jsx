/**
 * 商品组件
 */

import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ProductHome from './home';
import ProductAddUpdata from './addupdata';
import ProductDetail from './detail';

import './product.less'

class Product extends Component {
	render() {
		return (
			<Switch>
				{/* exact 唯一匹配 */}
				<Route path='/product' component={ProductHome} exact/>  
				<Route path='/product/addupdata' component={ProductAddUpdata} />
				<Route path='/product/detail' component={ProductDetail} />
				<Redirect to='/product' />
			</Switch>
		);
	}
}

export default Product;
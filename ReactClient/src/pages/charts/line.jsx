/**
 * 折线图组件
 */

import React, { Component } from 'react';

import { Card, Button } from "antd";
import ReactEcharts from "echarts-for-react"

class Bar extends Component {

	state = {
		// 销量数组
		series: [5, 20, 36, 10, 10, 20], 
		// 库存数组
		stores: [10, 40, 72, 30, 20, 60],
	}

	/**
	 * 返回折线图的配置对象
	 */
	getOption = () => {
		const { series, stores } = this.state;
		return {
			title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量', '库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: series
            }, {
				name: '库存',
                type: 'line',
                data: stores
			}],
			// axisLabel: {
			// 	formatter: `{value} ${件} `
			// }	
		}
	}

	/**
	 * 更新事件
	 */
	updata = () => {
		this.setState(state => ({
			series: state.series.map(serie => serie+1), 
			stores: state.stores.reduce((pre, store) =>{
				pre.push(store-1);
				return pre;
			}, []), 
		}))
	}
	
	render() {
		return (
			<div>
				<Card>
					<Button type="primary" onClick={ this.updata }>更新</Button>
				</Card>
				<Card title="折线图">
					<ReactEcharts option={this.getOption()} />
				</Card>
			</div>
		);
	}
}

export default Bar;

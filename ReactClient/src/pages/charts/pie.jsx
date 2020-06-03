/**
 * 饼状图组件
 */
import React, { Component } from 'react';

import { Card, Button } from "antd";
import ReactEcharts from "echarts-for-react"



class Bar extends Component {

	/**
	 * 返回饼状图一的配置对象
	 */
	getOption1 = () => {
		return {
			backgroundColor: '#2c343c',
			title: {
				text: '查看访问量的数据一',
				left: 'center',
				top: 20,
				textStyle: {
					color: '#ccc'
				}
			},
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			visualMap: {
				show: false,
				min: 80,
				max: 600,
				inRange: {
					colorLightness: [0, 1]
				}
			},
			series : [
				{
					name:'访问来源一',
					type:'pie',
					radius : '55%',
					center: ['50%', '50%'],
					data:[
						{value:335, name:'直接访问'},
						{value:310, name:'邮件营销'},
						{value:274, name:'联盟广告'},
						{value:235, name:'视频广告'},
						{value:400, name:'搜索引擎'}
					].sort(function (a, b) { return a.value - b.value; }),
					roseType: 'radius',
					label: {
						normal: {
							textStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							}
						}
					},
					labelLine: {
						normal: {
							lineStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							},
							smooth: 0.2,
							length: 10,
							length2: 20
						}
					},
					itemStyle: {
						normal: {
							color: '#c23531',
							shadowBlur: 200,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
		
					animationType: 'scale',
					animationEasing: 'elasticOut',
					animationDelay: function (idx) {
						return Math.random() * 200;
					}
				}
			]
		};
	}

	/**
	 * 返回饼状图二的配置对象
	 */
	getOption2 = () => {
		return {
			title: {
				text: '查看访问量的数据二',
				left: 'center',
				top: 20,
				textStyle: {
					color: '#000'
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
			},
			series: [
				{
					name:'访问来源',
					type:'pie',
					selectedMode: 'single',
					radius: [0, '30%'],
		
					label: {
						normal: {
							position: 'inner'
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data:[
						{value:335, name:'直达', selected:true},
						{value:679, name:'营销广告'},
						{value:1548, name:'搜索引擎'}
					]
				},
				{
					name:'访问来源',
					type:'pie',
					radius: ['40%', '55%'],
					label: {
						normal: {
							formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
							backgroundColor: '#eee',
							borderColor: '#aaa',
							borderWidth: 1,
							borderRadius: 4,
							shadowBlur:3,
							shadowOffsetX: 2,
							shadowOffsetY: 2,
							shadowColor: '#999',
							padding: [0, 7],
							rich: {
								a: {
									color: '#999',
									lineHeight: 22,
									align: 'center'
								},
								// abg: {
								//     backgroundColor: '#333',
								//     width: '100%',
								//     align: 'right',
								//     height: 22,
								//     borderRadius: [4, 4, 0, 0]
								// },
								hr: {
									borderColor: '#aaa',
									width: '100%',
									borderWidth: 0.5,
									height: 0
								},
								b: {
									fontSize: 16,
									lineHeight: 33
								},
								per: {
									color: '#eee',
									backgroundColor: '#334455',
									padding: [2, 4],
									borderRadius: 2
								}
							}
						}
					},
					data:[
						{value:335, name:'直达'},
						{value:310, name:'邮件营销'},
						{value:234, name:'联盟广告'},
						{value:135, name:'视频广告'},
						{value:1048, name:'百度'},
						{value:251, name:'谷歌'},
						{value:147, name:'必应'},
						{value:102, name:'其他'}
					]
				}
			]
		};
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
				<Card title="饼状图一">
					<ReactEcharts option={this.getOption1()} style={{ height: 500 }} />
				</Card>
				<Card title="饼状图二">
					<ReactEcharts option={this.getOption2()} style={{ height: 800 }} />
				</Card>
			</div>
		);
	}
}

export default Bar;





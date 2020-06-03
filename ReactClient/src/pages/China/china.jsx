import React, { Component } from 'react';
// import "./China.css";
import echarts from "echarts";
import "echarts/map/js/china";
import geoJson from "echarts/map/json/china.json";
import { geoCoordMap,provienceData } from "./geo";

class China extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.initalECharts();
    }

    /**
     * 展示的地区 json 数组
     */
    initalECharts = () => {
        const data = [
            { name: "黑龙江", area: "东北大区", type: "areaCenterCity" },
            { name: "吉林", area: "东北大区", type: "areaCenterCity" },
            { name: "辽宁", area: "东北大区", type: "areaCenterCity" },
            { name: "内蒙古", area: "其他", type: "areaCenterCity" },
            { name: "北京", area: "华北大区", type: "areaCenterCity" },
            { name: "天津", area: "华北大区", type: "areaCenterCity" },
            { name: "河北", area: "华北大区", type: "areaCenterCity" },
            { name: "山东", area: "华北大区", type: "areaCenterCity" },
            { name: "山西", area: "华北大区", type: "areaCenterCity" },
            { name: "江苏", area: "华东大区", type: "areaCenterCity" },
            { name: "上海", area: "华东大区", type: "areaCenterCity" },
            { name: "浙江", area: "华东大区", type: "areaCenterCity" },
            { name: "福建", area: "华南大区", type: "areaCenterCity" },
            { name: "广东", area: "华南大区", type: "areaCenterCity" },
            { name: "海南", area: "华南大区", type: "areaCenterCity" },
            { name: "台湾", area: "其他", type: "areaCenterCity" },
            { name: "香港", area: "其他", type: "areaCenterCity" },
            { name: "澳门", area: "其他", type: "areaCenterCity" },
            { name: "河南", area: "华北大区", type: "areaCenterCity" },
            { name: "安徽", area: "华中大区", type: "areaCenterCity" },
            { name: "江西", area: "华中大区", type: "areaCenterCity" },
            { name: "广东", area: "华南大区", type: "areaCenterCity" },
            { name: "陕西", area: "华西大区", type: "areaCenterCity" },
            { name: "湖北", area: "华中大区", type: "areaCenterCity" },
            { name: "湖南", area: "华中大区", type: "areaCenterCity" },
            { name: "广西", area: "华南大区", type: "areaCenterCity" },
            { name: "宁夏", area: "华西大区", type: "areaCenterCity" },
            { name: "重庆", area: "华西大区", type: "areaCenterCity" },
            { name: "贵州", area: "华西大区", type: "areaCenterCity" },
            { name: "四川", area: "华西大区", type: "areaCenterCity" },
            { name: "云南", area: "华西大区", type: "areaCenterCity" },
            { name: "甘肃", area: "华西大区", type: "areaCenterCity" },
            { name: "青海", area: "其他", type: "areaCenterCity" },
            { name: "西藏", area: "其他", type: "areaCenterCity" },
            { name: "新疆", area: "其他", type: "areaCenterCity" }
        ];
        echarts.registerMap("china", geoJson);
        for(let item of provienceData){
            if(item.area === "东北大区"){
                item.itemStyle = {
                    normal: {
                        areaColor: "#3CA2FC",
                    },
                    emphasis: {
                        areaColor: "#3CA2FC",
                    }
                }
            }else if(item.area === "华北大区"){
                item.itemStyle = {
                    normal: {
                        areaColor: "#6CAFBE",
                    },
                    emphasis: {
                        areaColor: "#6CAFBE",
                    }
                }
            }else if(item.area === "华中大区"){
                item.itemStyle = {
                    normal: {
                        areaColor: "#ADD03C",
                    },
                    emphasis: {
                        areaColor: "#ADD03C",
                    }
                }
            }else if(item.area === "华东大区"){
                item.itemStyle = {
                    normal: {
                        areaColor: "#A13614",
                    },
                    emphasis: {
                        areaColor: "#A13614",
                    }
                }
            }else if(item.area === "华西大区"){
                item.itemStyle = {
                    normal: {
                        areaColor: "#FFBA00",
                    },
                    emphasis: {
                     areaColor: "#FFBA00",
                    }
                }
            }else if(item.area === "华南大区"){
                item.itemStyle = {
                    normal: {
                        areaColor: "#FFD300",
                    },
                    emphasis: {
                        areaColor: "#FFD300",
                    }
                }
            }else if(item.area === "南海诸岛"){
            item.itemStyle = {
                normal: {
                    borderColor: "#fff",//区域边框颜色
                        areaColor:"#fff",//区域颜色
                    },
                    emphasis: {
                        show: false,
                        borderColor: "#fff",
                        areaColor:"#fff",
                    }
                }
            }else{
                item.itemStyle = {
                    normal: {
                        areaColor: "#D9D9D9",
                    },
                    emphasis: {
                        areaColor: "#D9D9D9",
                    }
                }
            }
        }
        const myChart = echarts.init(document.getElementById("mainMap"));
        myChart.setOption({
            tooltip: {
                trigger: "item", //触发类型,'item’数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis’坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
                triggerOn: "mousemove", //提示框触发的条件,'mousemove’鼠标移动时触发。'click’鼠标点击时触发。‘mousemove|click’同时鼠标移动和点击时触发。‘none’不在‘mousemove’ 或 ‘click’ 时触发
                showContent:true, //是否显示提示框浮层
                alwaysShowContent:true, //是否永远显示提示框内容
                showDelay:0, //浮层显示的延迟，单位为 ms
                hideDelay:100, //浮层隐藏的延迟，单位为 ms
                enterable:false, //鼠标是否可进入提示框浮层中
                confine:false, //是否将 tooltip 框限制在图表的区域内
                transitionDuration:0.4, //提示框浮层的移动动画过渡时间，单位是 s,设置为 0 的时候会紧跟着鼠标移动
                position:["50%", "10%"], //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置,[10,10],回掉函数，inside鼠标所在图形的内部中心位置，top、left、bottom、right鼠标所在图形上侧，左侧，下侧，右侧，
                "formatter": $ => {
                    // console.log(JSON.stringify($));
                    let dataCon = $.name;
                    return dataCon
                },
                backgroundColor: "transparent", //标题背景色
                borderColor: "#1DA57A", //边框颜色
                borderWidth:1, //边框线宽
                padding: [5, 10], //图例内边距，单位px 5 [5, 10] [5,10,5,10]
                textStyle:{ color: "#1da57a"} , //文本样式*/
                fontSize: 30
            },
            grid: {
                left: "10%",
                right: "10%",
                top: "10%",
                bottom: "10%",
                containLabel: true
                },
            geo: {
                map: "china",
                roam: false,
                zoom: 1.2,
                label: {
                    normal: {
                    show: false,//显示省份标签
                    textStyle:{color:"#1da57a"}//省份标签字体颜色
                },
                emphasis: {//对应的鼠标悬浮效果
                    show: false,
                        textStyle:{color:"#fff"}
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: .5,//区域边框宽度
                        borderColor: "#000",//区域边框颜色
                        areaColor:"#ffefd5",//区域颜色
                        color: "#1DA57A",
                    },
                    emphasis: {
                        show: false,
                        borderWidth: .5,
                        borderColor: "#4b0082",
                        areaColor: "#1DA57A",
                        color: "#fff",
                    }
                },
            },
            series: [
                {
                    type: "scatter", //‘line’（折线图） | ‘bar’（柱状图） | ‘scatter’（散点图） | ‘k’（K线图） //‘pie’（饼图） | ‘radar’（雷达图） | ‘chord’（和弦图） | ‘force’（力导向布局图） | ‘map’（地图）
                    coordinateSystem: "geo",
                    data: this.convertData(data),
                    symbolSize: 1,
                    symbolRotate: 40,
                    label: {
                        normal: {
                            formatter: "{b}",
                            position: "top",
                            show: true
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    tooltip: {
                        show: true, //不显示提示标签
                        formatter: function (name) {
                            return 'Legend' + name;
                        }, //提示标签格式
                        backgroundColor: "#fff",//提示标签背景颜色
                        borderColor: "#ccc",
                        borderWidth: 5,
                        textStyle: {color:"#000"} //提示标签字体颜色
                    },
                    itemStyle: {
                        normal: {
                            color: "black"
                        }
                    }
                },{
                    type: "map",
                    mapType: "china",
                    roam: false,
                    zoom: 1.2,
                    label: {
                        normal: {
                            show: false //显示省份标签
                        },
                        emphasis: {
                            show: false,
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: .5, //区域边框宽度
                            borderColor: "#fff", //区域边框颜色
                            label: {show:false}
                        },
                        emphasis: {
                            show: false,
                        }
                    },
                    geoIndex: 0,
                    //引入上边的tooltip属性切记这块必须要，不然上边的tooltip不生效
                    //tooltip主要功能是放在地图的每一个区域上可以弹出框
                    tooltip: { show: true },
                    data: provienceData
                }
            ]
        });      
    }


    convertData = (data) => {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].area),
                    area: data[i].area,
                    type: data[i].type,
                });
            }
        }
        console.log(res);
        return res;
    }


    render() {
        return (
            <div style={{position:"relative"}}>
                <div id="mainMap" style={{ width: "80vh", height:"80vh", marginLeft: "10%" }}></div>
            </div>
        );
    }
}

export default China;
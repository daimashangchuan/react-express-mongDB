/**
 * 头部组件
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Modal } from "antd";
import LinkButton from "../link-button";

import { UserServise } from "../../servise";
import formateUtils from "../../utils/formateUtils";
import storageUtils from "../../utils/storageUtils";
import cookiesUntils from "../../utils/cookiesUtils";
import memoryUtils from "../../utils/memoryUtils";
import menuList from "../../config/menuConfig";

import "./index.less";

const { confirm } = Modal;
class Header extends Component {
  state = {
    userName: "", //  用户名
    sysTime: "", //  时间
    dayPictureUrl: "", //  天气图片
    weather: "", //  天气
    currentCity: "", //  当前城市
    date: "",     // 日期和实时温度
    temperature: ""  // 气温区间
  };
  // 获取当天的天气
  reqWeather = async () => {
    // const citys = "乌兰察布市察哈尔右翼中旗";
    // const citys = "乌兰察布市察哈尔右翼后旗";
    const citys = "北京大兴区";
    const {
      dayPictureUrl,
      weather,
      date,
      currentCity,
      temperature
    } = await UserServise.reqWeather(citys);
    this.setState({
      dayPictureUrl,
      currentCity,
      weather,
      date,
      temperature
    });
  };
  //  获取标题
  getTitle = () => {
    const pathname = this.props.location.pathname;
    let title = "";
    menuList.forEach((item) => {
      if (item.path === pathname) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find((cItem) => cItem.path === pathname);
        if (cItem) {
          title = item.title + "/" + cItem.title;
        }
      }
    });
    return title;
  };
  //  第一次 render 函数执行之后执行的钩子函数
  componentWillMount() {
    this.reqWeather();
    this.getTitle();
    this.setState({
      userName: storageUtils.getUser().username,
    });
    this.timer = setInterval(() => {
      let sysTime = formateUtils.formateDate(new Date().getTime());
      this.setState({
        sysTime,
      });
    }, 1000);
  }
  // 退出登录的模态框
  showConfirm = () => {
    confirm({
      title: "确定要退出吗?",
      okText: "Yes",
      cancelText: "No",
      color: "#1DA57A",
      onOk: () => {
        clearInterval(this.timer);
        storageUtils.removeUser();
        cookiesUntils.delCookie("REACTTOKEN");
        memoryUtils.user = {};
        this.props.history.replace("/login");
      },
      onCancel() {},
    });
  };
  render() {
    // 普通方法
    // const headTitle = this.getTitle();

    // redux 状态管理方法
    const headTitle = this.props.headTitle;

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{this.state.userName}</span>
          <LinkButton onClick={this.showConfirm}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{headTitle}</div>
          <div className="header-bottom-right">
            <span>{this.state.sysTime}</span>
            <span>{this.state.currentCity}</span>
            <img src={this.state.dayPictureUrl} alt="weather" />
            <span>{this.state.weather}</span>
            <span>{this.state.temperature}</span>
            <span>{this.state.date}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  // redux 的 state 状态管理
  (state) => ({ headTitle: state.headTitle }),
  {}
)(withRouter(Header));

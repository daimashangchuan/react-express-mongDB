/**
 * 入口 js 文件
 * */ 
import React from "react";
import ReactDOM from "react-dom";


//  用来将 react 和 redux 建立联系
import { Provider } from "react-redux";
//  引入最新的 state 传值到 App 跟组件中
import store from "./redux/store";

import App from "./App";

import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';

const user = storageUtils.getUser();
memoryUtils.user = user;

// 将 App 组件标签渲染到 index.html 页面
ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
),document.getElementById("root"));

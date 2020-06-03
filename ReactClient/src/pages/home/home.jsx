/**
 *  首页组件 
 */

import React, { Component } from 'react';
import './home.less'

import China from "../China/china"

class Home extends Component {
    render() {
        return (
            <div className='home'>
                <h1>欢迎使用 react 框架构建的管理系统</h1>
                <China></China>
            </div>
        );
    }
}

export default Home;
/**
 * 前端 404 页面
 */

import React, { Component } from 'react';
import "./no-found.less";
import { Row, Col, Button } from "antd";

import { connect } from "react-redux";
import { setHeadTitle } from "../../redux/actions";
 
class NoFound extends Component {

    /**
     * 返回首页
     */
    goHome = () => {
        this.props.setHeadTitle('首页');
        this.props.history.replace('/home');
    }

    render() {
        return (
            <Row className="no-found">
                <Col span={12} className='left'></Col>
                <Col span={12} className='right'>
                    <h1>404组件</h1>
                    <h2>抱歉，你访问的页面不存在</h2>
                    <div>
                        <Button type="primary" onClick={ this.goHome }>返回首页</Button>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default connect(
    state => {},
    { setHeadTitle }
)(NoFound);
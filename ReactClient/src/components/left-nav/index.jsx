/**
 * 右侧导航的组件
 */

import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import { Menu, Icon } from 'antd';

//  使用 redux
import { connect } from "react-redux";
import { setHeadTitle } from "../../redux/actions" 

import menuList from '../../config/menuConfig'
import memoryUtils from "../../utils/memoryUtils"
import './index.less'
import logo from '../../pages/login/images/indext.jpg'


const { SubMenu } = Menu;
class LeftNav extends Component {
    state = {
        collapsed: false,
    };
    
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    /**
     * 判断是否有权限设置
     */
    hasAuth = (item) => {
        const { path, isPublic } = item;
        const type = memoryUtils.user.type;
        let menus = []
        if(memoryUtils.user.role) {
           menus = memoryUtils.user.role.menus;
        } else {
            return true;
        }
        /**
         * 当前用户的 type 类型是 maximum 是公开的
         * 当前用户的 type 类型是 minimum 不是公开的设置位用户的权限
         */
        if(type === "maximum" || isPublic || menus.indexOf(path) !== -1) {
            return true;
        } else if(item.children) {
            //  当前用户有此 item 的某个 item 的子权限
            return !!item.children.find(child => menus.indexOf(child.path) !== -1);
        } else {
            return false;
        }
    }

    //  根据数据数组生成组件标签  reduce和递归
    getMenuNides = (menuList) =>{
        const pathname = this.props.location.pathname;
        console.log(pathname);
        return menuList.reduce((pre,item)=>{
            //  向 pre 添加标签组件
            //  如果当前用户有 item 对应的权限，才需要显示对应的菜单项
            if(this.hasAuth(item)) {
                if(!item.children) {
                    //  解决刷新页面标题改变      判断 item.path 是否与当前的 pathname 路由对应   
                    if(item.path===pathname || pathname.indexOf(item.path)===0) {
                        //  更新 redux 中的 headTitle 状态
                        this.props.setHeadTitle(item.title)
                    }
                    pre.push((
                        <Menu.Item key={item.path}>
                            <Link to={item.path} onClick={ () => this.props.setHeadTitle(item.title) }>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                } else {
                    const cItem = item.children.find(cItem => pathname.indexOf(cItem.path)===0);
                    if(cItem) { this.openKey = item.path; }
                    pre.push((
                        <SubMenu key={item.path} title={ <span> <Icon type={item.icon} /> <span>{item.title}</span> </span> } >
                            { this.getMenuNides(item.children) }
                        </SubMenu>
                    ))
                }
            }
            
            return pre;
        },[])
    };

    componentWillMount(){
        console.log("获取用户的权限列表",menuList);
        this.menuNodes = this.getMenuNides(menuList)
    }

    render() {
        let pathname = this.props.location.pathname;
        if(pathname.indexOf('/product') === 0) {
            pathname = '/product';
        }
        const openKey = this.openKey;
        return (
            <div className="left-nav">
                <Link to='/'  className='left-nav-header'>
                    <img src={logo} alt=""/>
                    <h1>React后台</h1>
                </Link>
                <Menu mode="inline" theme="dark" 
                  selectedKeys={[pathname]}
                  defaultOpenKeys={[openKey]}>
                    { this.menuNodes }
                </Menu>
            </div>        
        );
    }
}

/**
 * withRouter是高阶组件
 *  包装非路由组件，返回一个新的组件
 *  新的组件向非路由组件传递三个属性 history/location/match
 */

export default connect(
    state => ({}),
    { setHeadTitle }
)(withRouter(LeftNav));

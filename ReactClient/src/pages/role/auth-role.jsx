/**
 * 设置角色名称的权限
 */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { Form, Input, Tree } from "antd";
import menuList from "../../config/menuConfig.js";

const Item = Form.Item;
const { TreeNode } = Tree;
class AuthRole extends PureComponent {
  static propTypes = {
    //  用来传递form对象的函数
    role: PropTypes.object,
  };

  constructor(props) {
    super(props);
    // 根据传入的角色跟新状态
    const { menus } = this.props.role;
    this.state = { checkedKeys: menus };
  }

  /**
   * 初始化数据
   */
  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.path}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      );
      return pre;
    }, []);
  };

  /**
   * 改变角色权限
   */
  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
  };

  /**
   * 传递给父组件最新的 menus
   */
  getMenus = () => this.state.checkedKeys;

  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList);
  }

  /**
   * 根据新传入的 role 来更新 checkedKeys状态
   */
  /**
   * 当组件自动传递过来的值更新后自动调用
   */
  componentWillReceiveProps(nextProps) {
    const { menus } = nextProps.role;
    this.setState({ checkedKeys: menus });
  }

  render() {
    const { role } = this.props;
    const { checkedKeys } = this.state;
    // 指定 Form.Item 布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    };
    return (
      <div>
        <Form>
          <Item label="角色名称" {...formItemLayout}>
            <Input value={role.name} disabled />
          </Item>
        </Form>
        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          {this.treeNodes}
        </Tree>
      </div>
    );
  }
}

export default AuthRole;

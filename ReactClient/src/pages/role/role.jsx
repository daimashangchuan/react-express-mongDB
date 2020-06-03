/**
 * 角色组件
 */

import React, { Component } from "react";

import { Card, Table, Button, Modal, message } from "antd";
import AddRole from "./add-role";
import AuthRole from "./auth-role";
import { UserServise } from "../../servise";
import memoryUtils from "../../utils/memoryUtils";
import formateUtils from "../../utils/formateUtils";
import storageUtils from "../../utils/storageUtils";
import cookiesUntils from "../../utils/cookiesUtils";
import { pageSize } from "../../utils/contransUntils";
class Role extends Component {
  state = {
    roles: [],
    role: {},
    loading: false,
    isShowAdd: false, // 添加角色
    isShowAuth: false, // 设置角色权限
  };

  constructor(props) {
    super(props);
    this.auth = React.createRef();
  }

  initColumns = () => {
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: (create_time) => formateUtils.formateDate(create_time),
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        render: (auth_time) => formateUtils.formateDate(auth_time),
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
      },
    ];
  };

  /**
   * 选中的行触发的事件触发事件
   */
  onRow = (role) => {
    return {
      // 	点击行
      onClick: (event) => {
        const id = this.state.role._id;
        if (id === role._id) {
          this.setState({ role: {} });
        } else {
          this.setState({ role });
        }
      },
    };
  };

  /**
   * 获取角色列表信息
   */
  getRoleList = async () => {
    this.setState({ loading: true });
    const { data, code } = await UserServise.reqRoleList();
    if (code === 0) {
      this.setState({ roles: data, loading: false });
    }
  };

  /**
   * 点击弹框确认按钮添加角色
   */
  addRole = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        const { name } = values;
        const result = await UserServise.reqAddRole({ name });
        message.success(result.msg);
        if (result.code === 0) {
          // 隐藏弹框
          this.setState({ isShowAdd: false });
          // 刷新列表
          this.getRoleList();
          // 清除输入数据
          this.form.resetFields();
        }
      }
    });
  };

  /**
   * 设置角色权限
   */
  updataRole = async () => {
    // 获取请求的参数标识
    const { role } = this.state;
    // 得到最新的 menus
    const menus = this.auth.current.getMenus();
    role.menus = menus;
    role.auth_time = new Date().getTime();
    role.auth_name = memoryUtils.user.username;
    role.auth_id = memoryUtils.user._id;
    const { code, msg } = await UserServise.reqUpdataRole({ role });
    message.success(msg);
    if (code === 0) {
      //  当前更新的是自己角色的权限，强制退出
      if (role._id === memoryUtils.user.role_id) {
        storageUtils.removeUser();
        cookiesUntils.delCookie("REACTTOKEN");
        memoryUtils.user = {};
        this.props.history.replace("/login");
        message.warning("用户权限被改变了，请重新登录！");
      } else {
        // 隐藏弹框 不请求接口刷新列表
        this.setState({ isShowAuth: false, roles: [...this.state.roles] });
      }
    }
  };

  componentDidMount() {
    this.getRoleList();
  }

  componentWillMount() {
    this.initColumns();
  }

  render() {
    const { roles, loading, role, isShowAdd, isShowAuth } = this.state;
    const rowSelection = {
      type: "radio",
      selectedRowKeys: [role._id],
      // 点击 radio 的回调函数
      onSelect: (role) => {
        this.setState({ role });
      },
    };
    const title = (
      <span>
        <Button type="primary" onClick={() => this.setState({ isShowAdd: true })}>
          创建角色
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button type="primary" onClick={() => this.setState({ isShowAuth: true })} disabled={!role._id}>
          设置角色权限
        </Button>
      </span>
    );
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          loading={loading}
          rowSelection={rowSelection}
          onRow={this.onRow}
          pagination={{ defaultPageSize: pageSize, showQuickJumper: true }}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => this.setState({ isShowAdd: false })}
        >
          <AddRole
            setForm={(form) => {
              this.form = form;
            }}
          ></AddRole>
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updataRole}
          onCancel={() => this.setState({ isShowAuth: false })}
        >
          <AuthRole ref={this.auth} role={role}></AuthRole>
        </Modal>
      </Card>
    );
  }
}

export default Role;

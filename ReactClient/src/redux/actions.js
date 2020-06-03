/**
 * 包含多个 action creator 函数的模块
 * 同步 action: 对象 { type: "xxx", data: "数据值" }
 * 异步 action: 函数 dispatch => {}
 */

import { SET_HEAD_TITLE } from "./action-types"

// 设置头部的标题的同步 action
export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle });

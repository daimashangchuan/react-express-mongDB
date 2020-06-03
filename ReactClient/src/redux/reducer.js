/**
 * 用来根据老的 state 和指定的 action 生成并返回新的 state 的函数 
 */
//  多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore
import { combineReducers } from "redux"

//  引用的 type 值，和 actions.js 的 type 相等（利用 type 来建立联系）
import { SET_HEAD_TITLE } from "./action-types"

/**
 * 用来管理头部标题的 reducer 函数
 */ 

import storageUtils from "../utils/storageUtils"
const initHeadTitle = "首页";
function headTitle(state = initHeadTitle, action) {
    switch (action.type) {
        case SET_HEAD_TITLE: 
            return action.data
        default:
            return state
    }
}


/**
 * 用来管理当前用户名的 reducer 函数
 */ 
const initUser = storageUtils.getUser();
function user(state = initUser, action) {
    switch (action.type) {
        default:
            return state
    }
}


//  向外暴露的是合并产生的总的 reducer 函数
/**
 * 管理的总的 state 的结构
 *  {
 *      headTitle: headTitle(),
 *      user: user()
 *  }
 */
export default combineReducers({
    headTitle,
    user
})
 
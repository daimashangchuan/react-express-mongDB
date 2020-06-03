/**
 * redux 的最核心的管理对象
 */
import { createStore, applyMiddleware } from "redux"
//  引入最新的 state
import reducer from "./reducer"
//  用来实现异步加载的 redux 状态
import thunk from "redux-thunk"
 
//  向外默认暴露 state
export default createStore(reducer, applyMiddleware(thunk))


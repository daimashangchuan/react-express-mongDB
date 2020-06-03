/**
 *  登录的接口地址 
 */
import axios from '../api/axios';
import jsonp from 'jsonp';
import { message } from "antd"

export default {
    // 注册接口
    reqRegister({ username, password, phone, email, role_id, roleName }) {
        return axios('/register',{ username, password, phone, email, role_id, roleName },'POST');
    },
    // 登录接口
    reqLogin({ username, password }) {
        return axios('/login',{ username, password },'POST');
    },
    // 获取在线天气信息
    reqWeather(city){
        return new Promise((resolve,reject)=>{
            const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=7OV0Snj8SZ0MZm8uP7N8ssmg`;
            jsonp(url,{},(err,response) => {
                if(!err && response.status==='success') {
                    console.log("获取天气的信息", response.results[0]);
                    const currentCity = response.results[0].currentCity
                    const weatherData = response.results[0].weather_data[0];
                    weatherData.currentCity = currentCity
                    resolve(weatherData);
                } else {
                    if(response.error === -3) {
                        message.success('获取天气地址错误，请更换地址');
                    }
                    reject(response.message);
                }
            })
        })
    },


    /**
     * 角色管理
     */

    //  获取所有的角色列表
    reqRoleList() {
        return axios('/manage/role/list',{},'POST');
    },
    //  添加角色名称
    reqAddRole({ name }) {
        return axios('/manage/role/add',{ name },'POST');
    },
    // 跟新角色权限
    reqUpdataRole({ role }) {
        return axios('/manage/role/updata',{ role },'POST');
    },


    /**
     * 用户管理
     */
    //  获取所有的用户列表
    reqUserList() {
        return axios('/manage/user/list',{},'POST');
    },
    //  获取所有的用户列表
    reqUserDelece(userId) {
        return axios('/manage/user/delece',{ userId },'POST');
    },
    //  添加用户
    reqUserAdd({ username, password, phone, email, role_id, roleName }) {
        return axios('/manage/user/add',{ username, password, phone, email, role_id, roleName },'POST');
    },
    //  添加用户
    reqUserUpdata({ username, phone, email, role_id, roleName, _id }) {
        return axios('/manage/user/updata',{ username, phone, email, role_id, roleName, _id },'POST');
    }
}


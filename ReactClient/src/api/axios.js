/**
 * 能异步发送 ajax 请求
 *  封装 axios
 *  返回的值是 promise 对象
 * 
 */
import axios from "axios"

// const BASE_URL = "http://localhost:4000";
const BASE_URL = "";

// 请求接口拦截
// axios.interceptors.request.use((request) => {
//     return request.data;
// });

//  响应接口返回的数据拦截
axios.interceptors.response.use(function (response) { 
    return response.data;
}, function (error) { 
    return Promise.reject(error);
})

export default function(url, data={}, type) {
    if(type === 'GET' || type === '') {
        return axios.get(BASE_URL+url, {
            params: data
        });
    } else if(type === 'POST'){
        return axios.post(BASE_URL+url, data);
    } else if(type === 'jsonp') {
        return axios.jsonp(BASE_URL+url, data);
    }
} 


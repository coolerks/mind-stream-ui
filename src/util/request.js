import axios from "axios";
import {BASE_URL} from "../constant/systemConstant.js";
import {message} from 'antd'
import {startLoading} from "../store/loading/loadingSlice.js";

const service = axios.create({
  baseURL: BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000000 // request timeout
})

service.interceptors.request.use(function (config) {
  startLoading();
  // 在发送请求之前做些什么
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // console.log("r1 = ", response);
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const {data} = response;
  if (data.code === 200) {
    return data.data;
  } else {
    message.error(data.msg || data.data);
    if (data.code === 401) {
      location.assign('/login');
    }
    return Promise.reject(data.msg);
  }
}, function (error) {
  // console.log("e2 = ", error);
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  message.error("请求失败，" + error.message)
  return Promise.reject(error);
});


export default service

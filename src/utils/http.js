// 网络请求工具类

// 引入 axios
import axios from 'axios';
//import { Toast } from 'vant';
import { notification } from 'ant-design-vue'

import router from '@/common/router';
import {SERVER_URL} from '@/common/const';

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = SERVER_URL;
} else {
  axios.defaults.baseURL = SERVER_URL;
}

// 超时时间
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

// axios.defaults.headers['X-Bmob-Application-Id']="fe114945ad61ad6213f0f1ca05d27c33";
// axios.defaults.headers['X-Bmob-REST-API-Key']="5a46b1f734df29b6e2b192c2c1b9e495";


// 响应拦截
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401: //未授权
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 404:
          // Toast({
          //   message: '网络请求不存在',
          //   duration: 1500,
          //   forbidClick: true
          // });
          notification["error"]({
            message: '网络请求不存在'
          });



          break;
        default:
          // Toast({
          //   message: error.response.data.message,
          //   duration: 1500,
          //   forbidClick: true
          // });
          
          notification["error"]({
            message: error.response.data.message
          });
      }
      return Promise.reject(error.response);
    }
  }
);

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

export function del(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
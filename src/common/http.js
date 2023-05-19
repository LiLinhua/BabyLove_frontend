import axios from 'axios';
import { Toast } from 'antd-mobile';

/**
 * 错误提示
 * @param {string} message 
 */
const showTips = (message) => {
    Toast.show({
        icon: 'fail',
        content: message || '请求失败，请稍后再试',
    });
}

/**
 * 错误处理
 * @param {Object} response 响应
 */
const errorHandler = (response) => {
    if (!response) {
        // 处理断网的情况
        if (!window.navigator.onLine) {
            showTips('网络已断开');
        } else {
            showTips('请求异常，请稍后再试');
        }
        return;
    }

    const { status, data } = response;
    if (status) {
        switch (status) {
            // 401: 未登录
            case 401:
                showTips('请先登录');
                sessionStorage.removeItem('babyLoveToken');
                break;

            // 404请求不存在
            case 404:
                showTips('请求不存在');
                break;

            // 其他错误，直接抛出错误提示
            default:
                showTips(data.message || '请求错误，请稍后再试');
        }
        return Promise.reject(response);
    }
}

// 创建axios实例
const instance = axios.create({ timeout: 12000 });

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请假拦截器
instance.interceptors.request.use(
    config => {
        // 登录拦截
        return config;
    },
    error => {
        return Promise.error(error);
    });

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        const { status, data } = response;
        if (status === 200) {
            if(!data || data.code !== 200 || !data.success){
                showTips(data.message);
            }
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response.data);
        }
    },
    // 处理异常
    error => errorHandler);

export default instance;
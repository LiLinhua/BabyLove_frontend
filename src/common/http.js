import axios from 'axios';
import { Toast } from 'antd-mobile';
import { toLogin, removeLoginSuccessFlag } from './utils';

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
 * 成功处理
 * @param {Object} response 响应
 */
function successHandler(response) {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误
    const { data } = response || {};
    if (!data) {
        showTips('系统异常，请稍后再试！');
        return Promise.reject(data);
    }
    if (!data || data.code !== 200 || !data.success) {
        showTips(data.message || '系统异常，请稍后再试！');
    }
    return Promise.resolve(data);
}

/**
 * 错误处理
 * @param {Object} res 响应
 */
function errorHandler(res) {
    // 处理断网的情况
    if (!window.navigator.onLine) {
        showTips('网络已断开');
        return Promise.reject(res.response || {});
    }

    const { status, data } = res.response || {};
    if (status) {
        switch (status) {
            // 401: 未登录
            case 401:
                showTips(data?.message || '请先登录');
                removeLoginSuccessFlag();
                toLogin();
                break;
            // 404请求不存在
            case 404:
                showTips('请求不存在');
                break;
            // 其他错误，直接抛出错误提示
            default:
                showTips(data?.message || '请求错误，请稍后再试');
        }
        return Promise.reject(res.response || {});
    }
}

// 创建axios实例
const instance = axios.create({ timeout: 12000 });

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请假拦截器
instance.interceptors.request.use(
    function (config) {
        // 登录拦截
        return config;
    },
    function (error) {
        return Promise.error(error);
    });

// 响应拦截器
instance.interceptors.response.use(successHandler, errorHandler);

export default instance;
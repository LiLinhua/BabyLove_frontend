import { history } from 'umi';
import request from './http';
import { getNavConfig as navConfig } from './config';
import { Toast } from 'antd-mobile';
import { customAddShoppingCart } from '../common/apis';


// 是否是管理后台
export const isAdmin = location.pathname.startsWith("/view/admin");

// 是否是登录页
export const isLoginPage = ["/view/admin/login", "/view/custom/login", "/view/login"].includes(location.pathname);

/**
 * 页面跳转
 * @param {string} url 页面地址
 * @param {boolean} isReload 是否刷新页面
 * @param {boolean} isUseOriginUrl 是否使用原地址
 * @returns 
 */
export const goTo = (url, isReload, isUseOriginUrl) => {
    if (!url) {
        return;
    }

    if (!isUseOriginUrl) {
        if (location.pathname.startsWith('/view/admin/')) {
            url = `/view/admin${url}`;
        } else {
            url = `/view${url}`;
        }
    }

    if (isReload) {
        location.href = url;
    } else {
        history.push(url);
    }
}

/**
 * 跳转登录页
 */
export const toLogin = () => {
    goTo(`/login?callback=${location.pathname}`, true);
};

/**
 * 设置登录成功标识
 */
export const setLoginSuccessFlag = () => {
    sessionStorage.setItem("babyLoveToken", "1");
};

/**
 * 删除登录成功标识
 */
export const removeLoginSuccessFlag = () => {
    sessionStorage.removeItem("babyLoveToken");
};

/**
 * 判断是否登录
 */
export const checkIsLogin = () => {
    return !!sessionStorage.getItem("babyLoveToken");
};


/**
 * 添加购物车
 * @returns 
 */
export const addShoppingCartCode = async () => {
    const { data } = await request.post(customAddShoppingCart);

    return data ? data.shoppingCartCode : null;
}

/**
 * 获取本地的购物车编码
 * @returns 
 */
export const getShoppingCartCode = async () => {
    let shoppingCartCode = localStorage.getItem('babyloveShoppingCartCode');
    if (!shoppingCartCode) {
        shoppingCartCode = await addShoppingCartCode();
    }
    if (!shoppingCartCode) {
        return Toast.show({
            icon: 'fail',
            content: '添加失败，请稍后再试',
        });
    }
    localStorage.setItem('babyloveShoppingCartCode', shoppingCartCode);
    return shoppingCartCode;
}

/**
 * 设置本地的购物车编码
 * @param {string} shoppingCartCode 
 * @returns 
 */
export const setShoppingCartCode = (shoppingCartCode) => {
    if (!shoppingCartCode) {
        return;
    }

    localStorage.setItem('babyloveShoppingCartCode', shoppingCartCode);
}

/**
 * 获取页面底部导航数据
 */
export const getNavConfig = async () => {
    const shoppingCartCode = await getShoppingCartCode();
    const config = navConfig(shoppingCartCode);
    if (isAdmin) {
        return config.admin;
    }

    return config.custom;
}

/**
 * 复制
 */
export const copy = (content) => {
    if (!content) {
        return;
    }

    try {
        let input = document.createElement('input');
        input.value = content;
        input.style.height = 0;
        document.body.append(input);
        input.select();
        document.execCommand('Copy');
        input.remove();
        return true;
    } catch (error) {
        return false;
    }
}



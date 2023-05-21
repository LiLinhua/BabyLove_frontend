import { history } from 'umi';
import request from './http';
import { navConfig } from './config';
import { Toast } from 'antd-mobile';
import { customAddShoppingCart } from '../common/apis';


// 是否登录
export const isLogined = !!sessionStorage.getItem("babyLoveToken");

// 是否是管理后台
export const isAdmin = location.pathname.startsWith("/view/admin");

// 是否是登录页
export const isLoginPage = ["/view/admin/login", "/view/custom/login", "/view/login"].includes(location.pathname);

/**
 * 页面跳转
 * @param {string} url 页面地址
 * @param {boolean} isReload 是否刷新页面
 * @returns 
 */
export const goTo = (url, isReload) => {
    if (!url) {
        return;
    }

    if (location.pathname.startsWith('/view/admin/')) {
        url = `/view/admin${url}`;
    } else {
        url = `/view${url}`;
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
    goTo('/login', true);
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
export const getNavConfig = () => {
    if (isAdmin) {
        return navConfig.admin;
    }

    return navConfig.custom;
}



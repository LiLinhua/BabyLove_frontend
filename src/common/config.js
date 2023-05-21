import { isAdmin } from './utils';

/**
 * 跳转页面
 * @param {string} url 
 * @returns 
 */
const handleToPage = (url) => {
    if (location.pathname === url) {
        return;
    }
    location.href = url;
};


// 底部导航配置
export const navConfig = {
    custom: [
        {
            title: "商品",
            onClick: () => handleToPage("/view/goods/list"),
        },
        {
            title: "购物车",
            onClick: () => handleToPage("/view/shopping-cart"),
        },
    ],
    admin: [
        {
            title: "商品",
            onClick: () => handleToPage("/view/admin/goods/list"),
        },
        {
            title: "购物车",
            onClick: () => handleToPage("/view/admin/shopping-cart"),
        },
    ]
};
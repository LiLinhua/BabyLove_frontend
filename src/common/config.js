import { goTo, getGradientStyle } from './utils';

// 管理后台首页配置
export const getAdminHomeNavConfig = (shoppingCartCode) => {
    return [
        {
            title: "商品",
            style: getGradientStyle('AAA'),
            onClick: () => goTo('/goods/list', true),
        },
        {
            title: "购物车",
            style: getGradientStyle('BBB'),
            onClick: () => goTo(`/shopping-cart?shoppingCartCode=${shoppingCartCode || ''}`, true),
        },
        {
            title: "订单",
            style: getGradientStyle('CCC'),
            onClick: () => goTo(`/order/list`, true),
        },
        {
            title: "分类",
            style: getGradientStyle('DDD'),
            onClick: () => goTo(`/order/list`, true),
        },
    ];
}

// 底部导航配置
export const getNavConfig = (shoppingCartCode) => {
    return {
        custom: [
            {
                title: "商品",
                onClick: () => goTo('/goods/list', true),
            },
            {
                title: "购物车",
                onClick: () => goTo(`/shopping-cart?shoppingCartCode=${shoppingCartCode || ''}`, true),
            },
            {
                title: "订单",
                onClick: () => goTo(`/order/list?shoppingCartCode=${shoppingCartCode || ''}`, true),
            },
        ],
        admin: [
            {
                title: "商品",
                onClick: () => goTo("/goods/list", true),
            },
            {
                title: "购物车",
                onClick: () => goTo(`/shopping-cart?shoppingCartCode=${shoppingCartCode || ''}`, true),
            },
            {
                title: "订单",
                onClick: () => goTo(`/order/list`, true),
            },
        ]
    }
};
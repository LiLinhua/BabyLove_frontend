import { goTo } from './utils';

// 管理后台首页配置
export const getAdminHomeNavConfig = (shoppingCartCode) => {
    return [
        {
            title: "商品",
            className: 'baby-love-admin-home-item-goods',
            onClick: () => goTo('/goods/list', true),
        },
        {
            title: "购物",
            className: 'baby-love-admin-home-item-cart',
            onClick: () => goTo(`/shopping-cart?shoppingCartCode=${shoppingCartCode || ''}`, true),
        },
        {
            title: "订单",
            className: 'baby-love-admin-home-item-order',
            onClick: () => goTo(`/order/list`, true),
        },
        {
            title: "分类",
            className: 'baby-love-admin-home-item-catalog',
            onClick: () => goTo(`/catalog/list`, true),
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
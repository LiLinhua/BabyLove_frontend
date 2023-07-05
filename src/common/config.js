import { goTo } from './utils';

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
                onClick: () => goTo(`/order/list?shoppingCartCode=${shoppingCartCode || ''}`, true),
            },
        ]
    }
};
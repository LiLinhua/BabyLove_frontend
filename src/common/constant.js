import { CheckCircleFill, ForbidFill, ExclamationCircleFill, ClockCircleFill } from "antd-mobile-icons";

export const orderStatus =
{
    WAIT_PAY: {
        value: 'WAIT_PAY',
        title: '待付款',
        icon: <ExclamationCircleFill />,
        backgroundColor: '#FFCC00',
    },  // 待付款
    WAIT_SEND: {
        value: 'WAIT_SEND',
        title: '待发货',
        icon: <ClockCircleFill />,
        backgroundColor: '#FF9900',
    }, // 待发货
    WAIT_GET: {
        value: 'WAIT_GET',
        title: '待收货',
        icon: <ClockCircleFill />,
        backgroundColor: '#FF6600',
    }, // 待收货
    FINISHED: {
        value: 'FINISHED',
        title: '已完成',
        icon: <CheckCircleFill />,
        backgroundColor: '#00FF00',
    }, // 已完成
    CANCELED: {
        value: 'CANCELED',
        title: '已取消',
        icon: <ForbidFill />,
        backgroundColor: '#CCCCCC',
    }, // 已取消
}

export const orderTitleMapToStatus =
{
    "待付款": {
        value: 'WAIT_PAY',
        title: '待付款',
        icon: <ExclamationCircleFill />,
        backgroundColor: '#FFCC00',
    },  // 待付款
    "待发货": {
        value: 'WAIT_SEND',
        title: '待发货',
        icon: <ClockCircleFill />,
        backgroundColor: '#FF9900',
    }, // 待发货
    "待收货": {
        value: 'WAIT_GET',
        title: '待收货',
        icon: <ClockCircleFill />,
        backgroundColor: '#FF6600',
    }, // 待收货
    "已完成": {
        value: 'FINISHED',
        title: '已完成',
        icon: <CheckCircleFill />,
        backgroundColor: '#00FF00',
    }, // 已完成
    "已取消": {
        value: 'CANCELED',
        title: '已取消',
        icon: <ForbidFill />,
        backgroundColor: '#CCCCCC',
    }, // 已取消
}

export const payWays =
{
    USER_BALANCE: {
        value: 'USER_BALANCE',
        title: '用户余额',
    },
    CASH: {
        value: 'CASH',
        title: '现金',
    },
    ALIPAY: {
        value: 'ALIPAY',
        title: '支付宝',
    },
    WECHAT: {
        value: 'WECHAT',
        title: '微信',
    },
}

export const goodsStatus = {
    NORMAL: {
        value: 'NORMAL',
        title: '上架',
    },
    OFFLINE: {
        value: 'OFFLINE',
        title: '下架',
    },
};
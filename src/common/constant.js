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
        value: 'WAIT_GET',
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
        value: 'WAIT_GET',
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
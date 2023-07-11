import { Button, Dialog, Toast } from "antd-mobile";
import { copy, goTo } from "@/common/utils";
import request  from "@/common/http";
import { adminUpdateOrderBaseInfo }  from "@/common/apis";
import { orderStatus }  from "@/common/constant";
import React from "react";

import "./index.less";
import { message } from "antd";

class OrderActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCanceling: false,
    };
  }

  /**
   * 取消订单
   */
  cancelOrder = async () => {
    const result = await Dialog.confirm({
      content: "确定取消订单吗？",
    });
    if (!result) {
      return;
    }
    this.setState({ isCanceling: true });
    const { success, message } = await request.post(adminUpdateOrderBaseInfo, { 
      orderCode: this.props.orderCode,
      orderStatus: orderStatus.CANCELED.value,
    });
    if(!success){
      Toast.show({
        content: message || '取消失败，请稍后再试',
        icon: 'fail',
      });
    }else{
      Toast.show({
        content: '取消成功',
        icon: 'success',
      });
      this.props.flushOrderDetails();
    }
    this.setState({ isCanceling: false });
  }

  /**
   * 去编辑订单
   */
  toEditOrder = () => {
    goTo(`/order/edit?orderCode=${this.props.orderCode}`);
  }

  /**
   * 查看物流
   */
  lookLogistics = () => {
    if(copy(this.props.orderCode)){
      Toast.show({
        icon: "success",
        content: "物流单号已复制，跳转查询中...",
        duration: 2000,
      });
      setTimeout(()=>{
        window.open('https://m.kuaidi100.com/index.jsp');
      }, 2000);
      return;
    }
    Toast.show({
      icon: "fail",
      content: "物流单号复制失败",
    });
  }

  /**
   * 联系售后
   */
  // connectPostSale = () => {
  //   Dialog.confirm({
  //     image: "/public/pictures/WX20230519-011105.png",
  //     title: "长按保存图片添加售后客服微信",
  //     // content: "长按保存图片添加售后客服微信",
  //     confirmText: "复制单号",
  //     onConfirm: () => {
  //       const copyResult = copy(this.props.orderCode);
  //       if (copyResult) {
  //         Toast.show({ content: "复制成功", icon: "success" });
  //       } else {
  //         Toast.show({ content: "复制失败，请手动复制", icon: "fail" });
  //       }
  //     },
  //   });
  // };

  /**
   * 渲染函数
   */
  render() {
    const isCanNotUpdateOrder = [orderStatus.WAIT_GET.value, orderStatus.FINISHED.value, orderStatus.CANCELED.value].includes(this.props.orderStatus);
    const isCanNotCancelOrder = [orderStatus.FINISHED.value, orderStatus.CANCELED.value].includes(this.props.orderStatus);

    return (
      <div className="baby-love-admin-order-details-actions">
        <Button color="primary" size="small" disabled={isCanNotCancelOrder} onClick={this.cancelOrder} loading={this.state.isCanceling}>取消订单</Button>
        <Button color="primary" size="small" disabled={isCanNotUpdateOrder} onClick={this.toEditOrder}>修改订单</Button>
        <Button color="primary" size="small" disabled={!this.props.expressCode} onClick={this.lookLogistics}>查询物流</Button>
        {/* <Button color="primary" size="small" onClick={this.connectPostSale}>
          联系售后
        </Button> */}
      </div>
    );
  }
}

export default OrderActions;

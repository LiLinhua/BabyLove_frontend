import { Button, Dialog, Toast } from "antd-mobile";
import { copy } from "@/common/utils";
import React from "react";

import "./index.less";

class OrderActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 查看物流
   */
  lookLogistics = () => {
    if(copy('2342342')){
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
  connectPostSale = () => {
    Dialog.confirm({
      image: "/public/pictures/WX20230519-011105.png",
      title: "长按保存图片添加售后客服微信",
      // content: "长按保存图片添加售后客服微信",
      confirmText: "复制单号",
      onConfirm: () => {
        const copyResult = copy(location.href);
        if (copyResult) {
          Toast.show({ content: "复制成功", icon: "success" });
        } else {
          Toast.show({ content: "复制失败，请手动复制", icon: "fail" });
        }
      },
    });
  };

  /**
   * 渲染函数
   */
  render() {
    return (
      <div className="baby-love-admin-order-details-actions">
        <Button color="primary" size="small">取消订单</Button>
        <Button color="primary" size="small">修改订单</Button>
        <Button color="primary" size="small" onClick={this.lookLogistics}>查询物流</Button>
        <Button color="primary" size="small" onClick={this.connectPostSale}>
          联系售后
        </Button>
      </div>
    );
  }
}

export default OrderActions;

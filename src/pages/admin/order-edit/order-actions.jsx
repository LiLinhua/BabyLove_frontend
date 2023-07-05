import { Button, Dialog, Input } from "antd-mobile";
import React from "react";

import "./index.less";

class OrderActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 取消订单
   */
  cancelOrder = async () => {
    const result = await Dialog.confirm({
      content: "确定取消该订单吗？",
    });
    if (!result) {
      return;
    }
  };

  /**
   * 确认修改
   */
  confirmUpdate = () => {};
  /**
   * 添加商品
   */
  addGoods = () => {
    Dialog.confirm({
      content: (<Input placeholder="请输入商品编码"/>),
      confirmText: '确定',
      onConfirm: () => {
        console.log('Confirmed')
      },
    });
  };

  /**
   * 渲染函数
   */
  render() {
    return (
      <div className="baby-love-admin-order-details-actions">
        <Button color="primary" onClick={this.cancelOrder}>
          取消订单
        </Button>
        <Button color="primary" onClick={this.addGoods}>
          添加商品
        </Button>
        <Button color="primary" onClick={this.confirmUpdate}>
          确定修改
        </Button>
      </div>
    );
  }
}

export default OrderActions;

import { Button } from "antd-mobile";
import React from "react";

import "./index.less";

class OrderBaseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 渲染函数
   */
  render() {
    return (
      <div className="baby-love-admin-order-details-base-info">
        <div className="baby-love-admin-order-details-base-info-item">
          <span>订单编号：</span>
          <span>232423423424</span>
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>订单时间：</span>
          <span>2023-01-01 12:00:00</span>
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>订单总价：</span>
          <span>¥1000</span>
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>配送方式：</span>
          <span>京东快递</span>
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>快递单号：</span>
          <span>232342342424</span>
          <Button color="primary" fill="none">
            复制单号
          </Button>
        </div>
      </div>
    );
  }
}

export default OrderBaseInfo;

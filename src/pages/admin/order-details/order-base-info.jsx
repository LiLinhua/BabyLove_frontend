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
    const { orderCode, createdAt, totalPrice, expressWay, expressCode } =
      this.props;
    return (
      <div className="baby-love-admin-order-details-base-info">
        <div className="baby-love-admin-order-details-base-info-item">
          <span>订单编号：</span>
          <span>{orderCode}</span>
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>订单时间：</span>
          <span>{createdAt}</span>
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>订单总价：</span>
          <span>¥{totalPrice}</span>
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>配送方式：</span>
          <span>{expressWay || "-"}</span>
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>快递单号：</span>
          <span>{expressCode || "-"}</span>
          {expressCode && (
            <Button color="primary" disabled={!expressCode} fill="none">
              复制单号
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default OrderBaseInfo;

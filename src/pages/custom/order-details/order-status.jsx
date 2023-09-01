import { orderStatus } from "@/common/constant";
import React from "react";

import "./index.less";

class OrderStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 渲染函数
   */
  render() {
    const {
      icon,
      title,
      backgroundColor,
    } = orderStatus[this.props.orderStatus] || {};
    return (
      <div
        className="baby-love-custom-order-details-status"
        style={{ backgroundColor }}
      >
        {icon}
        <span>{title}</span>
      </div>
    );
  }
}

export default OrderStatus;

import { DotLoading } from "antd-mobile";
import { CheckCircleFill } from 'antd-mobile-icons'
import React from "react";

import "./index.less";

class OrderStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  /**
   * 渲染函数
   */
  render() {
    return (
      <div className="baby-love-admin-order-details-status">
        <CheckCircleFill />
        <span>
          完成
        </span>
      </div>
    );
  }
}

export default OrderStatus;

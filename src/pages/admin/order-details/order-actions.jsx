import { Button } from "antd-mobile";
import React from "react";

import "./index.less";

class OrderActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 渲染函数
   */
  render() {
    return (
      <div className="baby-love-admin-order-details-actions">
          <Button color="primary">
            联系售后
          </Button>
      </div>
    );
  }
}

export default OrderActions;

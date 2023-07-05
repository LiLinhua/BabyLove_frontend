import React from "react";
import { AddCircleOutline } from "antd-mobile-icons";
import { goTo } from "@/common/utils";

class OrderAdd extends React.Component {
  constructor(props){
    super(props);
  }

  /**
   * 添加订单
   */
  addOrder = () => {
    goTo('/order/edit');
  }

  render() {
    return (
      <div className="baby-love-admin-order-add" onClick={this.addOrder}>
        <AddCircleOutline />
      </div>
    );
  }
}

export default OrderAdd;

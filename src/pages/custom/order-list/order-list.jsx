import { DotLoading } from "antd-mobile";
import React from "react";
import OrderItem from "./order-item";

class GoodsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { orderList, stopPropagation, toOrderDetails, isShowLoading } =
      this.props;

    if (isShowLoading) {
      return <DotLoading color="primary" />;
    }

    if (!orderList?.length) {
      return <p className="baby-love-admin-order-list-empty">暂无数据</p>;
    }

    return (
      <ul className="baby-love-admin-order-list-content">
        {orderList.map((orderItem) => (
          <li
            key={orderItem.orderCode}
            className="baby-love-admin-order-list-item"
            onClick={() => toOrderDetails(orderItem.orderCode)}
          >
            <OrderItem
              orderItem={orderItem}
              stopPropagation={stopPropagation}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default GoodsList;

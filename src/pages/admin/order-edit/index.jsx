import { DotLoading } from "antd-mobile";
import Moment from "moment";
import React from "react";
import { adminQueryOrderDetails } from "../../../common/apis";
import request from "../../../common/http";
import OrderActions from "./order-actions";
import OrderBaseInfo from "./order-base-info";
import OrderGoods from "./order-goods";
import OrderStatus from "./order-status";

import "./index.less";

class OrderEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDetails: {},
      isShowLoading: false,
    };
    // 产品编码
    const searchParams = new URLSearchParams(location.search);
    this.orderCode = searchParams.get("orderCode");
  }

  componentDidMount() {
    this.getOrderDetails();
  }

  /**
   * 设置 loading 效果
   * @param {boolean} isShowLoading 是否显示 loading 效果
   */
  setLoading = (isShowLoading) => {
    this.setState({ isShowLoading });
  };

  /**
   * 获取订单详情
   */
  getOrderDetails = async () => {
    if (!this.orderCode) {
      return;
    }
    const { data } = await request.post(adminQueryOrderDetails, {
      orderCode: this.orderCode,
    });
    if (data) {
      data.createdAt = Moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss");
      this.setState({ orderDetails: data });
    }

    this.setLoading(false);
  };
  /**
   * 渲染函数
   */
  render() {
    const {
      status,
      orderCode,
      expressWay,
      expressCode,
      totalPrice,
      createdAt,
      goods,
      totalCount,
    } = this.state.orderDetails || {};

    return (
      <div className="baby-love-admin-order-details">
        {this.state.isShowLoading ? (
          <DotLoading color="primary" />
        ) : (
          <>
            <div className="baby-love-admin-order-details-info">
              <OrderStatus orderStatus={status} />
              <OrderBaseInfo
                orderCode={orderCode}
                createdAt={createdAt}
                orderStatus={status}
                expressWay={expressWay}
                expressCode={expressCode}
                totalPrice={totalPrice}
              />
              <OrderGoods
                goods={goods}
                orderStatus={status}
                totalCount={totalCount}
                orderCode={orderCode}
                flushOrderDetails={this.getOrderDetails}
              />
            </div>
            <OrderActions
              orderCode={orderCode}
              orderStatus={status}
              flushOrderDetails={this.getOrderDetails}
            />
          </>
        )}
      </div>
    );
  }
}

export default OrderEdit;
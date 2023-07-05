import { DotLoading } from "antd-mobile";
import React from "react";
import { adminQueryGoodsDetails } from "../../../common/apis";
import request from "../../../common/http";
import OrderActions from "./order-actions";
import OrderBaseInfo from "./order-base-info";
import OrderGoods from "./order-goods";

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
    this.goodsCode = searchParams.get("goodsCode");
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
    if (!this.goodsCode) {
      return;
    }
    const { data } = await request.get(adminQueryGoodsDetails, {
      params: { goodsCode: this.goodsCode },
    });
    if (data) {
      this.setState({ orderDetails: data });
    }

    this.setLoading(false);
  };
  /**
   * 渲染函数
   */
  render() {
    const { goodsTitle, goodsSubtitle, goodsPrice, orderDetails, pictures } =
      this.state.orderDetails || {};

    return (
      <div className="baby-love-admin-order-details">
        {this.state.isShowLoading ? (
          <DotLoading color="primary" />
        ) : (
          <>
            <div className="baby-love-admin-order-details-info">
              <OrderBaseInfo />
              <OrderGoods />
            </div>
            <OrderActions />
          </>
        )}
      </div>
    );
  }
}

export default OrderEdit;

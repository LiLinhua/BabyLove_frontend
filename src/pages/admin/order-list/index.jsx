import React from "react";
import { adminQueryAllOrders } from "../../../common/apis";
import request from "../../../common/http";
import { goTo } from "../../../common/utils";
import OrderList from "./order-list";
import SearchBar from "./order-search";
import Moment from "moment";

import "./index.less";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      keyword: '',
      isShowLoading: false,
    };
  }

  componentDidMount() {
    this.initData();
  }

  /**
   * 初始化数据
   */
  initData = async () => {
    await this.getOrderList();
  };

  /**
   * 获取订单列表
   */
  getOrderList = async () => {
    this.setState({ isShowLoading: true });
    const { data } = await request.post(adminQueryAllOrders, { keyword: this.state.keyword });

    if (Array.isArray(data)) {
      this.setState({ orderList: data.map(orderItem => {
        orderItem.createdAt = Moment(orderItem.createdAt).format('YYYY-MM-DD HH:mm:ss');
        return orderItem;
      }), isShowLoading: false });
      return;
    }
    this.setState({ isShowLoading: false });
  };

  /**
   * 搜索
   */
  onSearch = (keyword) => {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.setState({ keyword }, this.getOrderList)
    }, 500);
  }

  /**
   * 跳转订单详情页
   * @param {string} orderCode 订单编码
   */
  toOrderDetails = (orderCode) => {
    goTo("/order/details?orderCode=" + orderCode);
  };

  /**
   * 阻止事件冒泡
   * @param {event} e
   */
  stopPropagation = (e) => {
    e && e.stopPropagation();
  };

  render() {
    const { orderList, isShowLoading } = this.state;

    return (
      <div className="baby-love-admin-order-list">
        <SearchBar onSearch={this.onSearch}/>
        <OrderList
          orderList={orderList}
          stopPropagation={this.stopPropagation}
          toOrderDetails={this.toOrderDetails}
          isShowLoading={isShowLoading}
        />
      </div>
    );
  }
}

export default Order;

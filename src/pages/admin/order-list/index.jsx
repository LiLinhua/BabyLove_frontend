import DayJS from "dayjs";
import React from "react";
import { adminQueryAllOrders } from "../../../common/apis";
import request from "../../../common/http";
import { goTo } from "../../../common/utils";
import OrderList from "./order-list";
import SearchBar from "./order-search";

import "./index.less";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      showOrderList: [],
      keyword: "",
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
    const { data } = await request.post(adminQueryAllOrders, {
      keyword: this.state.keyword,
    });

    if (Array.isArray(data)) {
      const orderList = data.map((orderItem) => {
        orderItem.createdAt = DayJS(orderItem.createdAt).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        return orderItem;
      });
      this.setState({
        showOrderList: orderList,
        orderList: orderList,
        isShowLoading: false,
      });
      return;
    }
    this.setState({ isShowLoading: false });
  };

  /**
   * 搜索
   * @param {string} keyword 关键词
   * @param {string} type 搜索类型，可选值：order、user、goods
   */
  onSearch = (keyword, type) => {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      switch (type) {
        case "order":
          this.setState({ keyword }, this.getOrderList);
          break;
        case "user":
          this.setState({
            showOrderList: !keyword || !keyword.trim() ? this.state.orderList : this.state.orderList.filter((order) => {
              return (
                order.user?.userName?.indexOf(keyword) > -1 ||
                order.user?.userNickname?.indexOf(keyword) > -1 ||
                order.user?.userPhone?.indexOf(keyword) > -1 ||
                order.user?.userCode?.indexOf(keyword) > -1
              );
            }),
          });
          break;
        case "goods":
          this.setState({
            showOrderList: !keyword || !keyword.trim() ? this.state.orderList : this.state.orderList.filter((order) => {
              if(!Array.isArray(order.goods)){
                return false;
              }
              return order.goods.find(goodsItem => {
                return (
                  goodsItem.goodsTitle?.indexOf(keyword) > -1 ||
                  goodsItem.goodsCode?.indexOf(keyword) > -1
                );
              })
            }),
          });
          break;
      }
    }, 500);
  };

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
    const { showOrderList, isShowLoading } = this.state;

    return (
      <div className="baby-love-admin-order-list">
        <SearchBar onSearch={this.onSearch} />
        <OrderList
          orderList={showOrderList}
          stopPropagation={this.stopPropagation}
          toOrderDetails={this.toOrderDetails}
          isShowLoading={isShowLoading}
          getOrderList={this.getOrderList}
        />
      </div>
    );
  }
}

export default Order;

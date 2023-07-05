import { Button, Dialog, Toast } from "antd-mobile";
import React from "react";
import {
  adminQueryAllShoppingCarts,
  adminQueryShoppingCartAllGoods,
  adminShoppingCartBatchRemoveGoods,
  adminShoppingCartBatchUpdateSelected,
  adminShoppingCartUpdateBuyCount,
} from "../../../common/apis";
import request from "../../../common/http";
import {
  copy,
  getShoppingCartCode,
  goTo,
  setShoppingCartCode,
} from "../../../common/utils";
import GoodsList from "./order-list";
import SearchBar from "./order-search";
// import OrderAdd from "./order-add";

import "./index.less";

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allShoppingCartList: [],
      shoppingCartList: [],
      goodsList: [],
      selectGoodsCodes: [],
      totalPrice: 0,
      isShowSelectShoppingCartModal: false,
      isShowModalLoading: true,
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
    
    await this.getGoodsList('e2e441e4-4fd9-49e4-a79a-d62eace2b079');
    
  };

  /**
   * 获取商品列表
   * @param {string} shoppingCartCode 购物车编码
   */
  getGoodsList = async (shoppingCartCode) => {
    if (!shoppingCartCode) {
      return;
    }
    this.setState({ isShowLoading: true });
    const { data } = await request.get(adminQueryShoppingCartAllGoods, {
      params: { shoppingCartCode },
    });

    if(data?.goods){
      this.setState({ goodsList: data.goods, isShowLoading: false});
      return;
    }
    this.setState({ isShowLoading: false });
  };

  /**
   * 跳转商品详情页
   * @param {string} goodsCode 商品编码
   */
  toGoodsDetails = (goodsCode) => {
    goTo("/order/details?orderCode=" + goodsCode);
  };

  /**
   * 阻止事件冒泡
   * @param {event} e
   */
  stopPropagation = (e) => {
    e && e.stopPropagation();
  };


  render() {
    const {
      totalPrice,
      shoppingCartList,
      selectGoodsCodes,
      isShowSelectShoppingCartModal,
      goodsList,
      isShowModalLoading,
      isShowLoading,
    } = this.state;

    return (
      <div className="baby-love-admin-order-list">
        <SearchBar />
        <GoodsList
          goodsList={goodsList}
          selectGoodsCodes={selectGoodsCodes}
          selectGoods={this.selectGoods}
          changeCount={this.changeCount}
          stopPropagation={this.stopPropagation}
          toGoodsDetails={this.toGoodsDetails}
          isShowLoading={isShowLoading}
        />
        {/* <OrderAdd /> */}
      </div>
    );
  }
}

export default OrderList;

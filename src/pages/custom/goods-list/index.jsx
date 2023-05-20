import React from "react";
import { customQueryAllGoods } from "../../../common/apis";
import request from "../../../common/http";
import ShoppingCartFloat from "../../../components/shopping-cart-float";
import GoodsList from "./goods-list";

import "./index.less";

class GoodsListIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getGoodsList();
  }

  /**
   * 查询商品列表
   */
  getGoodsList = async () => {
    this.setState({ isLoading: true });
    const { data } = await request.get(customQueryAllGoods);
    this.setState({ goodsList: data, isLoading: false });
  };

  /**
   * 渲染函数
   */
  render() {
    const { goodsList, isLoading } = this.state;
    return (
      <div className="baby-love-custom-goods">
        {/* 商品列表 */}
        <GoodsList
          goodsList={goodsList}
          isLoading={isLoading}
          getGoodsList={this.getGoodsList}
        />
        {/* 购物车图标 */}
        <ShoppingCartFloat />
      </div>
    );
  }
}

export default GoodsListIndex;

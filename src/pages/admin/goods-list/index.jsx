import React from "react";
import { adminQueryAllGoods } from "../../../common/apis";
import request from "../../../common/http";
import { goTo } from "../../../common/utils";
import ShoppingCartFloat from "../../../components/shopping-cart-float";
import GoodsAdd from "./goods-add";
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
    const { data } = await request.get(adminQueryAllGoods);
    this.setState({ goodsList: data, isLoading: false });
  };

  /**
   * 添加商品
   */
  addGoods = () => {
    goTo("/goods/edit");
  };

  /**
   * 渲染函数
   */
  render() {
    const { goodsList, isLoading } = this.state;
    return (
      <div className="baby-love-admin-goods">
        {/* 商品列表 */}
        <GoodsList
          goodsList={goodsList}
          isLoading={isLoading}
          getGoodsList={this.getGoodsList}
        />
        {/* 购物车图标 */}
        <ShoppingCartFloat />
        {/* 新增商品图标 */}
        <GoodsAdd addGoods={this.addGoods} />
      </div>
    );
  }
}

export default GoodsListIndex;

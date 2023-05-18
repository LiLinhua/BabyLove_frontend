import { DotLoading } from "antd-mobile";
import { AddCircleOutline } from "antd-mobile-icons";
import React from "react";
import { history } from "umi";
import { adminQueryAllGoods } from "../../../common/apis";
import request from "../../../common/http";
import ShoppingCartFloat from "../../../components/shopping-cart-float";
import GoodsItem from "./goods-item";

import "./index.less";

class GoodsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.handleGetGoodsList();
  }

  /**
   * 查询商品列表
   */
  handleGetGoodsList = async () => {
    this.setState({ isLoading: true });
    const { data } = await request.get(adminQueryAllGoods);
    this.setState({ goodsList: data, isLoading: false });
  };

  /**
   * 跳转购物车页
   * @returns
   */
  handleGoToCart = () => {
    if (location.pathname.startsWith("/admin/")) {
      return history.push("/view/admin/shopping-cart");
    }
    history.push("/view/shopping-cart");
  };

  /**
   * 添加商品
   */
  handleAddGoods = () => {
    history.push("/view/admin/goods/edit");
  };

  render() {
    const { goodsList } = this.state;
    return (
      <div className="baby-love-admin-goods">
        {/* 商品列表 */}
        <div className="baby-love-admin-goods-list">
          {goodsList.length < 1 ? (
            this.state.isLoading ? (
              <DotLoading color="primary" />
            ) : (
              <p className="baby-love-admin-goods-list-empty">暂无数据</p>
            )
          ) : (
            <>
              {goodsList.map((goods) => (
                <GoodsItem
                  key={goods.goodsCode}
                  {...goods}
                  getGoodsList={this.handleGetGoodsList}
                />
              ))}
            </>
          )}
        </div>
        {/* 购物车图标 */}
        <ShoppingCartFloat />
        {/* 新增商品图标 */}
        <div
          className="baby-love-admin-goods-add"
          onClick={this.handleAddGoods}
        >
          <AddCircleOutline />
        </div>
      </div>
    );
  }
}

export default GoodsList;

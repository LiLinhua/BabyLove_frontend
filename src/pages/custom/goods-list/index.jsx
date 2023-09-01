import React from "react";
import { customQueryAllGoods } from "../../../common/apis";
import request from "../../../common/http";
import ShoppingCartFloat from "../../../components/shopping-cart-float";
import GoodsList from "./goods-list";
import GoodsSearch from "./goods-search";
import GoodsSwiper from "./swiper";

import "./index.less";

class GoodsListIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      isLoading: false,
      swiperPictures: window.babyLoveSwiperPictures || [],
    };
  }

  componentDidMount() {
    this.getGoodsList();
  }

  /**
   * 查询商品列表
   */
  getGoodsList = async (keyword, goodsCatalog) => {
    this.setState({ isLoading: true });
    const { data } = await request.get(customQueryAllGoods, {
      params: {
        keyword,
        goodsCatalog,
      },
    });
    this.setState({ goodsList: data, isLoading: false });
  };

  /**
   * 渲染函数
   */
  render() {
    const { swiperPictures, goodsList, isLoading } = this.state;
    return (
      <div className="baby-love-custom-goods">
        <GoodsSwiper pictures={swiperPictures} />
        <GoodsSearch onSearch={this.getGoodsList} />
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

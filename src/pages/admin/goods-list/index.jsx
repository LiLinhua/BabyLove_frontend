import React from "react";
import { adminQueryAllGoods } from "../../../common/apis";
import request from "../../../common/http";
import { goTo } from "../../../common/utils";
import ShoppingCartFloat from "../../../components/shopping-cart-float";
import GoodsAdd from "./goods-add";
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
      isShowGoodsSwiper: true,
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
    const { data } = await request.get(adminQueryAllGoods, {
      params: {
        keyword,
        goodsCatalog,
      },
    });
    this.setState({ goodsList: data, isLoading: false });
  };

  /**
   * 添加商品
   */
  addGoods = () => {
    goTo("/goods/edit");
  };

  /**
   * 商品列表滚动事件
   */
  onGoodsListScroll = (e) => {
    const handleScroll = () => {
      const { isShowGoodsSwiper } = this.state;
      if (!e.target.firstChild) {
        if (!isShowGoodsSwiper) {
          this.setState({ isShowGoodsSwiper: !isShowGoodsSwiper });
        }
        return;
      }

      if (this.lastY === undefined) {
        this.lastY =
          e.target.firstChild.getBoundingClientRect().y -
          e.target.getBoundingClientRect().y;
        return;
      }

      this.nowY =
        e.target.firstChild.getBoundingClientRect().y -
        e.target.getBoundingClientRect().y;
      if (this.nowY === 0 && !isShowGoodsSwiper) {
        this.setState({ isShowGoodsSwiper: true });
        return;
      }

      if (this.lastY > this.nowY && !isShowGoodsSwiper) {
        // 向下滚动
        this.setState({ isShowGoodsSwiper: true });
      } else if (isShowGoodsSwiper) {
        // 向上滚动
        this.setState({ isShowGoodsSwiper: false });
      }

      console.log(this.nowY, this.lastY, e);

      this.lastY = this.nowY;
    };

    clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout(handleScroll, 200);
  };

  /**
   * 渲染函数
   */
  render() {
    const { swiperPictures, goodsList, isLoading, isShowGoodsSwiper } =
      this.state;
    return (
      <div className="baby-love-admin-goods">
        <GoodsSwiper pictures={swiperPictures} isShow={isShowGoodsSwiper} />
        <GoodsSearch onSearch={this.getGoodsList} />
        {/* 商品列表 */}
        <GoodsList
          goodsList={goodsList}
          isLoading={isLoading}
          getGoodsList={this.getGoodsList}
          onScroll={this.onGoodsListScroll}
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

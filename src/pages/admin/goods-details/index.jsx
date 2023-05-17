import ShoppingCartIcon from "@/assets/shopping-cart.png";
import { Button } from "antd-mobile";
import React from "react";
import { history } from "umi";
import { adminQueryGoodsDetails } from "../../../common/apis";
import request from "../../../common/http";
import GoodsBaseInfo from "./base-info";
import GoodsSwiper from "./swiper";

import "./index.less";

class Goods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsDetails: {},
    };
    const searchParams = new URLSearchParams(location.search);
    this.goodsCode = searchParams.get("goodsCode");
  }
  componentDidMount() {
    this.getGoodsDetails();
  }
  getGoodsDetails = async () => {
    if (!this.goodsCode) {
      return;
    }
    const { data } = await request.get(adminQueryGoodsDetails, {
      params: { goodsCode: this.goodsCode },
    });
    if (data) {
      this.setState({ goodsDetails: data });
    }
  };
  handleGoToCart = () => {
    history.push("/shopping-cart");
  };
  render() {
    const { goodsTitle, goodsSubtitle, goodsPrice, goodsDetails, pictures } =
      this.state.goodsDetails || {};
    return (
      <div className="baby-love-admin-goods">
        {/* 商品列表 */}
        <div className="baby-love-admin-goods-details">
          {/* 轮播图 */}
          <GoodsSwiper pictures={pictures} />
          {/* 商品信息 */}
          <GoodsBaseInfo
            goodsTitle={goodsTitle}
            goodsSubtitle={goodsSubtitle}
            goodsPrice={goodsPrice}
          />
          {/* 商品详情 */}
          <div
            className="baby-love-admin-goods-details-details"
            dangerouslySetInnerHTML={{ __html: goodsDetails }}
          ></div>
          {/* 加入购物车 */}
          <div className="baby-love-admin-goods-details-add-to-cart">
            <Button color="primary">加入购物车</Button>
          </div>
          {/* 购物车图标 */}
          <div
            className="baby-love-admin-goods-to-cart"
            onClick={this.handleGoToCart}
          >
            <span>12</span>
            <img src={ShoppingCartIcon} />
          </div>
        </div>
      </div>
    );
  }
}

export default Goods;

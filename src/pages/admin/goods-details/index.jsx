import { Button, Toast } from "antd-mobile";
import React from "react";
import { history } from "umi";
import { adminQueryGoodsDetails, adminShoppingCartAddGoods } from "../../../common/apis";
import request from "../../../common/http";
import { getShoppingCartCode } from "../../../common/utils";
import GoodsBaseInfo from "./base-info";
import GoodsSwiper from "./swiper";
import ShoppingCartFloat from "../../../components/shopping-cart-float";

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
  handleAddToCart = async () => {
    const shoppingCartCode = await getShoppingCartCode();

    const { success } = await request.post(adminShoppingCartAddGoods, {
      shoppingCartCode,
      goodsCode: this.goodsCode,
      buyCount: 1,
    });

    if (success) {
      Toast.show({
        icon: "success",
        content: "添加成功",
      });

      // 刷新购物车商品数据
      this.props.ShoppingCart?.flushShoppingCartGoodsCount();
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
            <Button color="primary" onClick={this.handleAddToCart}>加入购物车</Button>
          </div>
          {/* 购物车图标 */}
          <ShoppingCartFloat />
        </div>
      </div>
    );
  }
}

export default Goods;

import { DotLoading, Toast } from "antd-mobile";
import React from "react";
import {
  adminQueryGoodsDetails,
  adminShoppingCartAddGoods,
} from "../../../common/apis";
import request from "../../../common/http";
import { getShoppingCartCode } from "../../../common/utils";
import ShoppingCartFloat from "../../../components/shopping-cart-float";
import AddToShoppingCart from "./add-to-shopping-cart";
import GoodsBaseInfo from "./base-info";
import GoodsSwiper from "./swiper";

import "./index.less";

class Goods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsDetails: {},
      isShowLoading: true,
    };
    // 产品编码
    const searchParams = new URLSearchParams(location.search);
    this.goodsCode = searchParams.get("goodsCode");
  }

  componentDidMount() {
    this.getGoodsDetails();
  }

  /**
   * 设置 loading 效果
   * @param {boolean} isShowLoading 是否显示 loading 效果
   */
  setLoading = (isShowLoading) => {
    this.setState({ isShowLoading });
  };

  /**
   * 获取商品详情
   */
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

    this.setLoading(false);
  };
  /**
   * 添加商品到购物车
   */
  addToCart = async () => {
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
  /**
   * 渲染函数
   */
  render() {
    const {
      goodsTitle,
      goodsStatus,
      goodsSubtitle,
      goodsPrice,
      goodsOriginPrice,
      goodsDetails,
      goodsInventory,
      pictures,
    } = this.state.goodsDetails || {};
    return (
      <div className="baby-love-admin-goods">
        {/* 商品列表 */}
        <div className="baby-love-admin-goods-details">
          {this.state.isShowLoading ? (
            // loading 效果
            <DotLoading color="primary" />
          ) : (
            <>
              {/* 轮播图 */}
              <GoodsSwiper
                pictures={pictures}
                goodsInventory={goodsInventory}
                goodsStatus={goodsStatus}
              />
              {/* 商品信息 */}
              <GoodsBaseInfo
                goodsTitle={goodsTitle}
                goodsSubtitle={goodsSubtitle}
                goodsDetails={goodsDetails}
                goodsPrice={goodsPrice}
                goodsOriginPrice={goodsOriginPrice}
              />
              {/* 加入购物车 */}
              <AddToShoppingCart
                goodsInventory={goodsInventory}
                goodsStatus={goodsStatus}
                addToCart={this.addToCart}
              />
            </>
          )}

          {/* 购物车图标 */}
          <ShoppingCartFloat />
        </div>
      </div>
    );
  }
}

export default Goods;

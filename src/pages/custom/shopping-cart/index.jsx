import { Dialog, DotLoading, Toast } from "antd-mobile";
import React from "react";
import {
  customQueryShoppingCartAllGoods,
  customShoppingCartBatchRemoveGoods,
  customShoppingCartBatchUpdateSelected,
  customShoppingCartUpdateBuyCount,
} from "../../../common/apis";
import request from "../../../common/http";
import { copy, getShoppingCartCode, goTo } from "../../../common/utils";
import GoodsList from "./goods-list";
import OrderInfo from "./order-info";

import "./index.less";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      selectGoodsCodes: [],
      totalPrice: 0,
      isShowLoading: true,
    };

    this.shoppingCartCode = null;
  }

  componentDidMount() {
    this.initData();
  }

  /**
   * 初始化数据
   */
  initData = async () => {
    await this.setShoppingCartCode();
    await this.getGoodsList();
  };

  /**
   * 阻止事件冒泡
   */
  stopPropagation = (e) => {
    e && e.stopPropagation();
    return false;
  };

  /**
   * 设置购物车编码
   */
  setShoppingCartCode = async () => {
    this.shoppingCartCode = await getShoppingCartCode();
  };

  /**
   * 获取商品列表
   */
  getGoodsList = async () => {
    const { data } = await request.get(customQueryShoppingCartAllGoods, {
      params: { shoppingCartCode: this.shoppingCartCode },
    });

    let updateState = { isShowLoading: false };
    if (data && Array.isArray(data.goods)) {
      const selectGoodsCodes = [];
      data.goods.forEach((good) => {
        if (good.selected) {
          selectGoodsCodes.push(good.goodsCode);
        }
      });
      updateState = { ...updateState, goodsList: data.goods, selectGoodsCodes };
    }

    this.setState(updateState, this.setTotalPrice);
  };

  /**
   * 修改数量
   * @param {Event} e
   * @param {Object} record 修改的商品
   * @param {number} count 修改的数量
   */
  changeCount = async (e, record, count) => {
    // 阻止事件冒泡
    this.stopPropagation(e);

    // 数量修正
    count = count < 1 ? 1 : count;

    // 修改后台购物车商品数量
    const { success, data, errCode } = await request.post(
      customShoppingCartUpdateBuyCount,
      {
        shoppingCartCode: this.shoppingCartCode,
        goodsCode: record.goodsCode,
        buyCount: count,
      }
    );
    if (!success) {
      return;
    }

    if (errCode === "OUT_OF_STOCK") {
      // 库存不足
      Toast.show({
        content: "该商品库存不足",
      });
      count = data;
    }

    // 修改前端数量
    const { goodsList } = this.state;
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].goodsCode === record.goodsCode) {
        goodsList[i].buyCount = count < 1 ? 1 : count;
        this.setState({ goodsList: [...goodsList] });
        break;
      }
    }

    // 计算订单总价
    this.setTotalPrice();
  };

  /**
   * 跳转商品详情页
   * @param {string} goodsCode 商品编码
   */
  toGoodsDetails = (goodsCode) => {
    goTo("/goods/details?goodsCode=" + goodsCode);
  };

  /**
   * 设置订单总价
   */
  setTotalPrice = () => {
    const { selectGoodsCodes, goodsList } = this.state;
    let totalPrice = 0;
    goodsList.forEach((goodsItem) => {
      if (selectGoodsCodes.includes(goodsItem.goodsCode)) {
        totalPrice += goodsItem.goodsPrice * goodsItem.buyCount;
      }
    });

    this.setState({ totalPrice });
  };

  /**
   * 选择商品
   * @param {string} goodsCode 商品编码
   * @param {boolean} isSelect 是否选择商品
   */
  selectGoods = async (goodsCode, isSelect) => {
    let { selectGoodsCodes } = this.state;

    const { code, message, success } = await request.post(
      customShoppingCartBatchUpdateSelected,
      {
        shoppingCartCode: this.shoppingCartCode,
        goodsCodes: [goodsCode],
        selected: isSelect ? 1 : 0,
      }
    );
    if (!success) {
      return;
    }

    if(code === 'SOME_GOODS_EMPTY'){
      Toast.show({
        content: message || "商品库存不足",
      });
    }

    this.getGoodsList(this.shoppingCartCode);

    // const index = selectGoodsCodes.indexOf(goodsCode);
    // if (isSelect && index === -1) {
    //   selectGoodsCodes.push(goodsCode);
    //   this.setState(
    //     { selectGoodsCodes: [...selectGoodsCodes] },
    //     this.setTotalPrice
    //   );
    // } else if (!isSelect && index > -1) {
    //   selectGoodsCodes.splice(index, 1);
    //   this.setState(
    //     { selectGoodsCodes: [...selectGoodsCodes] },
    //     this.setTotalPrice
    //   );
    // }
  };

  /**
   * 选择全部
   * @param {string} isSelectAll 是否选择全部
   */
  selectAllGoods = async (isSelectAll) => {
    const selectGoodsCodes = isSelectAll
      ? this.state.goodsList.map((goodsItem) => goodsItem.goodsCode)
      : [];
    const { code, success, message } = await request.post(
      customShoppingCartBatchUpdateSelected,
      {
        shoppingCartCode: this.shoppingCartCode,
        goodsCodes: selectGoodsCodes,
        selected: isSelectAll ? 1 : 0,
      }
    );
    if (!success) {
      return;
    }

    if(code === 'SOME_GOODS_EMPTY'){
      Toast.show({
        content: message || "商品库存不足",
      });
    }

    this.getGoodsList(this.shoppingCartCode);

    // this.setState(
    //   {
    //     selectGoodsCodes,
    //   },
    //   this.setTotalPrice
    // );
  };

  /**
   * 删除商品
   */
  remove = async () => {
    let { selectGoodsCodes, goodsList } = this.state;

    if (!selectGoodsCodes.length) {
      return Toast.show({ content: "请先选择商品" });
    }

    const result = await Dialog.confirm({
      content: "确定删除所选商品吗？",
    });
    if (!result) {
      return;
    }
    const { success } = await request.post(customShoppingCartBatchRemoveGoods, {
      shoppingCartCode: this.shoppingCartCode,
      goodsCodes: selectGoodsCodes,
    });
    if (!success) {
      return;
    }

    Toast.show({
      icon: "success",
      content: "删除成功！",
    });

    goodsList = goodsList.filter(
      (goodsItem) => !selectGoodsCodes.includes(goodsItem.goodsCode)
    );

    this.setState({ goodsList, selectGoodsCodes: [] });
  };

  /**
   * 下单
   */
  buy = () => {
    let { selectGoodsCodes } = this.state;

    if (!selectGoodsCodes.length) {
      return Toast.show({ content: "请先选择商品" });
    }

    Dialog.confirm({
      image: "/public/pictures/WX20230519-011105.png",
      title: "专属客服下单",
      content: (
        <>
          <p>1、长按保存图片添加专属客服微信；</p>
          <p>2、复制购物车地址发给专属客服下单。</p>
          <p>购物车地址：{location.href}</p>
        </>
      ),
      confirmText: "复制地址",
      onConfirm: async () => {
        const copyResult = copy(location.href);
        if (copyResult) {
          setTimeout(() => {
            Toast.show({ content: "复制成功", icon: "success" });
          }, 300);
        } else {
          Toast.show({ content: "复制失败，请手动复制", icon: "fail" });
        }
      },
    });
  };

  render() {
    const { totalPrice, selectGoodsCodes, goodsList, isShowLoading } =
      this.state;

    return (
      <div className="baby-love-custom-shopping-cart">
        {isShowLoading ? (
          <DotLoading color="primary" />
        ) : (
          <>
            <GoodsList
              goodsList={goodsList}
              selectGoodsCodes={selectGoodsCodes}
              selectGoods={this.selectGoods}
              changeCount={this.changeCount}
              stopPropagation={this.stopPropagation}
              toGoodsDetails={this.toGoodsDetails}
            />
            <OrderInfo
              totalPrice={totalPrice}
              goodsList={goodsList}
              selectGoodsCodes={selectGoodsCodes}
              selectAllGoods={this.selectAllGoods}
              remove={this.remove}
              buy={this.buy}
            />
          </>
        )}
      </div>
    );
  }
}

export default ShoppingCart;

import { Dialog, Toast } from "antd-mobile";
import React from "react";
import {
  adminQueryAllShoppingCarts,
  adminShoppingCartBatchRemoveGoods,
  adminShoppingCartBatchUpdateSelected,
  adminShoppingCartUpdateBuyCount,
} from "../../../common/apis";
import request from "../../../common/http";
import { goTo } from "../../../common/utils";
import {
  getShoppingCartCode,
  setShoppingCartCode,
} from "../../../common/utils";
import GoodsList from "./goods-list";
import OrderInfo from "./order-info";
import SelectShoppingCartModal from "./select-shopping-cart-modal";

import "./index.less";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingCartList: [],
      goodsList: [],
      selectGoodsCodes: [],
      totalPrice: 0,
      isShowSelectShoppingCartModal: true,
      isShowModalLoading: true,
    };
  }

  componentDidMount() {
    this.getShoppingCartList();
  }

  /**
   * 阻止事件冒泡
   */
  stopPropagation = (e) => {
    e && e.stopPropagation();
    return false;
  };

  /**
   * 查询购物车列表
   */
  getShoppingCartList = async () => {
    const { data } = await request.get(adminQueryAllShoppingCarts);

    if (Array.isArray(data)) {
      this.setState({ shoppingCartList: data });
    }

    this.setState({ isShowModalLoading: false });
  };

  /**
   * 显示选择购物车弹窗
   * @param {boolean} isShow 是否显示选择购物车弹窗
   */
  showSelectShoppingCartModal = (isShow) => {
    this.setState({
      isShowSelectShoppingCartModal: isShow,
    });
  };

  /**
   * 选择购物车
   * @param {Object} shoppingCart 购物车信息
   */
  selectShoppingCart = async (shoppingCart) => {
    setShoppingCartCode(shoppingCart.shoppingCartCode);

    const goodsList = await this.getGoodsList(shoppingCart);
    const selectGoodsCodes = [];
    goodsList.forEach((good) => {
      if (good.selected) {
        selectGoodsCodes.push(good.goodsCode);
      }
    });

    this.setState({
      isShowSelectShoppingCartModal: false,
      goodsList: goodsList || [],
      selectGoodsCodes,
    });
  };

  /**
   * 获取商品列表
   * @param {string} shoppingCart 购物车信息
   */
  getGoodsList = async (shoppingCart) => {
    return shoppingCart?.goods || [];
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
    const { success, data, errCode } = await request.post(adminShoppingCartUpdateBuyCount, {
      shoppingCartCode: await getShoppingCartCode(),
      goodsCode: record.goodsCode,
      buyCount: count,
    });
    if (!success) {
      return;
    }

    if(errCode === 'OUT_OF_STOCK'){
      // 库存不足
      Toast.show({
        content: '该商品库存不足'
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

    const { success } = await request.post(
      adminShoppingCartBatchUpdateSelected,
      {
        shoppingCartCode: await getShoppingCartCode(),
        goodsCodes: [goodsCode],
        selected: isSelect ? 1 : 0,
      }
    );
    if (!success) {
      return;
    }

    const index = selectGoodsCodes.indexOf(goodsCode);
    if (isSelect && index === -1) {
      selectGoodsCodes.push(goodsCode);
      this.setState(
        { selectGoodsCodes: [...selectGoodsCodes] },
        this.setTotalPrice
      );
    } else if (!isSelect && index > -1) {
      selectGoodsCodes.splice(index, 1);
      this.setState(
        { selectGoodsCodes: [...selectGoodsCodes] },
        this.setTotalPrice
      );
    }
  };

  /**
   * 选择全部
   * @param {string} isSelectAll 是否选择全部
   */
  selectAllGoods = async (isSelectAll) => {
    const selectGoodsCodes = isSelectAll
      ? this.state.goodsList.map((goodsItem) => goodsItem.goodsCode)
      : [];
    const { success } = await request.post(
      adminShoppingCartBatchUpdateSelected,
      {
        shoppingCartCode: await getShoppingCartCode(),
        goodsCodes: selectGoodsCodes,
        selected: isSelectAll ? 1 : 0,
      }
    );
    if (!success) {
      return;
    }

    this.setState(
      {
        selectGoodsCodes,
      },
      this.setTotalPrice
    );
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
    const { success } = await request.post(adminShoppingCartBatchRemoveGoods, {
      shoppingCartCode: await getShoppingCartCode(),
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

    Dialog.alert({
      image: "/public/pictures/WX20230519-011105.png",
      title: "专属客服下单",
      content: (
        <>
          <p>1、长按保存图片添加专属客服微信；</p>
          <p>2、复制购物车地址发给专属客服下单。</p>
          <p>购物车地址：{location.href}</p>
        </>
      ),
      confirmText: "复制购物车地址",
      onConfirm: () => {
        navigator &&
          navigator.clipboard &&
          navigator.clipboard
            .writeText(location.href)
            .then((res) => {
              Toast.show({ content: "复制成功", icon: "success" });
            })
            .catch((err) => {
              Toast.show({
                content: "复制失败，请手动复制上面的购物车地址",
                icon: "fail",
              });
            });
      },
    });
  };

  render() {
    const {
      totalPrice,
      shoppingCartList,
      selectGoodsCodes,
      isShowSelectShoppingCartModal,
      goodsList,
      isShowModalLoading,
    } = this.state;

    return (
      <div className="baby-love-admin-shopping-cart">
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
        <SelectShoppingCartModal
          isShowSelectShoppingCartModal={isShowSelectShoppingCartModal}
          isShowModalLoading={isShowModalLoading}
          shoppingCartList={shoppingCartList}
          selectShoppingCart={this.selectShoppingCart}
        />
      </div>
    );
  }
}

export default ShoppingCart;

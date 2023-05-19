import { Dialog, List, Modal, Toast } from "antd-mobile";
import React from "react";
import { history } from "umi";
import {
  adminQueryAllShoppingCarts,
  adminShoppingCartBatchRemoveGoods,
  adminShoppingCartBatchUpdateSelected,
  adminShoppingCartUpdateBuyCount,
} from "../../../common/apis";
import request from "../../../common/http";
import GoodsItem from "./goods-item";
import OrderInfo from "./order-info";

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
    };
    this.shoppingCartCode = null;
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
  };

  /**
   * 显示选择购物车弹窗
   */
  showSelectShoppingCartModal = (isShow) => {
    this.setState({
      isShowSelectShoppingCartModal: isShow,
    });
  };

  /**
   * 选择购物车
   */
  selectShoppingCart = async (shoppingCart) => {
    this.shoppingCartCode = shoppingCart.shoppingCartCode;
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
   * @param {Object} record
   */
  changeCount = async (e, record, count) => {
    // 阻止事件冒泡
    this.stopPropagation(e);

    // 数量修正
    count = count < 1 ? 1 : count;

    // 修改后台购物车商品数量
    const { success } = await request.post(adminShoppingCartUpdateBuyCount, {
      shoppingCartCode: this.shoppingCartCode,
      goodsCode: record.goodsCode,
      buyCount: count,
    });
    if (!success) {
      return;
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
   * @param {string} goodsCode
   */
  toGoodsDetails = (goodsCode) => {
    history.push("/view/goods/details?goodsCode=" + goodsCode);
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
   * @param {string} goodsCode
   */
  selectGoods = async (goodsCode, isSelect) => {
    let { selectGoodsCodes } = this.state;

    const { success } = await request.post(
      adminShoppingCartBatchUpdateSelected,
      {
        shoppingCartCode: this.shoppingCartCode,
        goodsCodes: [goodsCode],
        selected: isSelect ? 1 : 0,
      }
    );
    if (!success) {
      return;
    }

    debugger;
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
   */
  selectAllGoods = async (isSelectAll) => {
    debugger;
    const selectGoodsCodes = isSelectAll
      ? this.state.goodsList.map((goodsItem) => goodsItem.goodsCode)
      : [];
    const { success } = await request.post(
      adminShoppingCartBatchUpdateSelected,
      {
        shoppingCartCode: this.shoppingCartCode,
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
   * 删除
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
      shoppingCartCode: this.shoppingCartCode,
      goodsCodes: selectGoodsCodes,
    });
    if (!success) {
      return;
    }

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
    } = this.state;

    return (
      <div className="baby-love-admin-shopping-cart">
        {!goodsList.length ? (
          <div className="baby-love-admin-shopping-cart-empty">暂无数据</div>
        ) : null}
        <ul>
          {goodsList.map((goodsItem) => (
            <li
              key={goodsItem.goodsCode}
              className="baby-love-admin-shopping-cart-goods-item"
              onClick={() => this.toGoodsDetails(goodsItem.goodsCode)}
            >
              <GoodsItem
                goodsItem={goodsItem}
                selectGoodsCodes={selectGoodsCodes}
                selectGoods={this.selectGoods}
                changeCount={this.changeCount}
                stopPropagation={this.stopPropagation}
              />
            </li>
          ))}
        </ul>
        <OrderInfo
          totalPrice={totalPrice}
          goodsList={goodsList}
          selectGoodsCodes={selectGoodsCodes}
          selectAllGoods={this.selectAllGoods}
          remove={this.remove}
          buy={this.buy}
        />
        <Modal
          title="选择购物车"
          visible={isShowSelectShoppingCartModal}
          content={
            <div>
              <List>
                {shoppingCartList.map((shoppingCart) => (
                  <List.Item
                    onClick={() => this.selectShoppingCart(shoppingCart)}
                  >
                    {shoppingCart.shoppingCartCode}
                  </List.Item>
                ))}
              </List>
            </div>
          }
        />
      </div>
    );
  }
}

export default ShoppingCart;

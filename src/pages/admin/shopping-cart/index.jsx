import { Dialog, Toast } from "antd-mobile";
import React from "react";
import { history } from "umi";
import { adminQueryAllShoppingCarts } from "../../../common/apis";
import request from "../../../common/http";
import { getShoppingCartCode } from "../../../common/utils";
import GoodsItem from "./goods-item";
import OrderInfo from "./order-info";

import "./index.less";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingCartList: [],
      selectGoodsCodes: [],
      totalPrice: 0,
    };
  }
  componentDidMount() {
    this.getGoodsList();
  }

  /**
   * 阻止事件冒泡
   */
  stopPropagation = (e) => {
    e && e.stopPropagation();
    return false;
  };

  /**
   * 修改数量
   */
  getGoodsList = async () => {
    const shoppingCartCode = await getShoppingCartCode();

    const { data } = await request.get(adminQueryAllShoppingCarts, {
      params: {
        shoppingCartCode,
      },
    });

    if (Array.isArray(data)) {
      this.setState({ shoppingCartList: data });
    }
  };

  /**
   * 修改数量
   * @param {Event} e
   * @param {Object} record
   */
  changeCount = (e, record, count) => {
    const { goodsList } = this.state;
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].goodsCode === record.goodsCode) {
        goodsList[i].goodsCount = count < 1 ? 1 : count;
        this.setState({ goodsList: [...goodsList] });
        break;
      }
    }
    // 计算订单总价
    this.setTotalPrice();
    // 阻止事件冒泡
    this.stopPropagation(e);
    return false;
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
        totalPrice += goodsItem.goodsPrice * goodsItem.goodsCount;
      }
    });

    this.setState({ totalPrice });
  };

  /**
   * 选择商品
   * @param {string} goodsCode
   */
  selectGoods = (goodsCode, isSelect) => {
    let { selectGoodsCodes } = this.state;

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
  selectAllGoods = (isSelectAll) => {
    this.setState(
      {
        selectGoodsCodes: isSelectAll
          ? this.state.goodsList.map((goodsItem) => goodsItem.goodsCode)
          : [],
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

    goodsList = goodsList.filter(
      (goodsItem) => !selectGoodsCodes.includes(goodsItem.goodsCode)
    );

    this.setState({ goodsList });
  };

  /**
   * 下单
   */
  buy = () => {
    let { selectGoodsCodes, goodsList } = this.state;

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
    const { totalPrice, shoppingCartList, selectGoodsCodes } = this.state;
    let totalGoods = [];
    return (
      <div className="baby-love-admin-shopping-cart">
        {shoppingCartList.map((shoppingCart) => {
          totalGoods = totalGoods.concat(shoppingCart.goods);
          return (
            <ul>
              <li className="baby-love-admin-shopping-cart-code">
                {shoppingCart.shoppingCartCode}
              </li>
              {(shoppingCart.goods || []).map((goodsItem) => (
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
          );
        })}

        <OrderInfo
          totalPrice={totalPrice}
          goodsList={totalGoods}
          selectGoodsCodes={selectGoodsCodes}
          selectAllGoods={this.selectAllGoods}
          remove={this.remove}
          buy={this.buy}
        />
      </div>
    );
  }
}

export default ShoppingCart;

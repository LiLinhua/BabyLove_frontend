import NoPictureIcon from "@/assets/no-picture.png";
import ShoppingBagIcon from "@/assets/shopping-bag.png";
import { Dialog, Ellipsis, Toast } from "antd-mobile";
import { DeleteOutline, EditSOutline } from "antd-mobile-icons";
import { inject, observer } from "mobx-react";
import React from "react";
import {
  adminRemoveGoods,
  adminShoppingCartAddGoods,
} from "../../../common/apis";
import request from "../../../common/http";
import { getShoppingCartCode, goTo } from "../../../common/utils";

import "./index.less";

@inject("ShoppingCart")
@observer
class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * 跳转商品详情页
   */
  toGoodsDetails = () => {
    const { goodsCode } = this.props;
    goTo("/goods/details?goodsCode=" + goodsCode);
  };

  /**
   * 添加商品到购物车
   * @param {event} e
   * @param {string} goodsCode
   */
  addToCart = async (e, goodsCode) => {
    this.stopPropagation(e);

    // 获取当前购物车编码
    const shoppingCartCode = await getShoppingCartCode();

    const { success } = await request.post(adminShoppingCartAddGoods, {
      shoppingCartCode,
      goodsCode,
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
   * 阻止事件冒泡
   * @param {event} e
   */
  stopPropagation = (e) => {
    e && e.stopPropagation();
  };

  /**
   * 删除商品
   * @param {event} e 事件
   * @param {string} goodsCode 商品编码
   * @returns
   */
  remove = async (e, goodsCode) => {
    this.stopPropagation(e);

    const result = await Dialog.confirm({
      content: "确定删除该商品吗？",
    });
    if (!result) {
      return;
    }
    const { success } = await request.post(adminRemoveGoods, { goodsCode });
    if (success) {
      Toast.show({
        icon: "success",
        content: "删除成功！",
      });
      this.props.getGoodsList();
    }
  };

  /**
   * 去编辑商品
   * @param {event} e 事件
   * @param {string} goodsCode 商品编码
   */
  edit = (e, goodsCode) => {
    this.stopPropagation(e);

    goTo("/goods/edit?goodsCode=" + goodsCode);
  };

  /**
   * 渲染函数
   */
  render() {
    const { goodsCode, goodsTitle, goodsPrice, pictures, goodsInventory } =
      this.props;
    const picture = pictures && pictures[0] ? pictures[0] : {};
    return (
      <div
        className="baby-love-admin-goods-list-item"
        onClick={this.toGoodsDetails}
      >
        <div className="baby-love-admin-goods-list-action">
          <span onClick={(e) => this.edit(e, goodsCode)}>
            编辑 <EditSOutline />
          </span>
          <span onClick={(e) => this.remove(e, goodsCode)}>
            删除 <DeleteOutline />
          </span>
        </div>
        <div className="baby-love-admin-goods-list-item-picture">
          <img
            className={
              picture.pictureUrl
                ? ""
                : "baby-love-admin-goods-list-item-empty-picture"
            }
            key={picture.pictureCode}
            src={picture.pictureUrl || NoPictureIcon}
          />
          <span className="baby-love-custom-goods-list-item-inventory">仅剩{goodsInventory}件</span>
        </div>
        <div className="baby-love-admin-goods-list-item-content">
          <Ellipsis direction="end" rows={2} content={goodsTitle} />
          {/* <p className="baby-love-admin-goods-list-item-title">{goodsTitle}</p> */}
          {/* <p className="baby-love-admin-goods-list-item-subtitle">
            {goodsSubtitle}
          </p> */}
          <p className="baby-love-admin-goods-list-item-buy">
            <span className="baby-love-admin-goods-list-item-price">
              ¥{goodsPrice}
            </span>
            <span
              className="baby-love-admin-goods-list-item-add"
              onClick={(e) => this.addToCart(e, goodsCode)}
            >
              <img src={ShoppingBagIcon} />
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default ListItem;

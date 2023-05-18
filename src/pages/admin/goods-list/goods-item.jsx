import NoPictureIcon from "@/assets/no-picture.png";
import ShoppingBagIcon from "@/assets/shopping-bag.png";
import { Dialog, Ellipsis, Toast } from "antd-mobile";
import { DeleteOutline, EditSOutline } from "antd-mobile-icons";
import { inject, observer } from "mobx-react";
import React from "react";
import { history } from "umi";
import {
  adminRemoveGoods,
  adminShoppingCartAddGoods,
} from "../../../common/apis";
import request from "../../../common/http";
import { getShoppingCartCode } from "../../../common/utils";

import "./index.less";

@inject("ShoppingCart")
@observer
class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  handleItemClick = () => {
    const { goodsCode } = this.props;
    history.push("/view/admin/goods/details?goodsCode=" + goodsCode);
  };

  handleAddToCart = async (e, goodsCode) => {
    this.stopPropagation(e);

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

  stopPropagation = (e) => {
    e && e.stopPropagation();
  };

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

  edit = (e, goodsCode) => {
    this.stopPropagation(e);

    history.push("/view/admin/goods/edit?goodsCode=" + goodsCode);
  };

  render() {
    const { goodsCode, goodsTitle, goodsSubtitle, goodsPrice, pictures } =
      this.props;
    console.log("=======props=======", this.props);
    const picture = pictures && pictures[0] ? pictures[0] : {};
    return (
      <div
        className="baby-love-admin-goods-list-item"
        onClick={this.handleItemClick}
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
            key={picture.pictureCode}
            src={picture.pictureUrl || NoPictureIcon}
          />
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
              onClick={(e) => this.handleAddToCart(e, goodsCode)}
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

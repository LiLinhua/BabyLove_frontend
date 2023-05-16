import ShoppingBagIcon from "@/assets/shopping-bag.png";
import { DeleteOutline, EditSOutline } from "antd-mobile-icons";
import { Dialog, Toast } from "antd-mobile";

import React from "react";
import { history } from "umi";

import "./index.less";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  handleItemClick = () => {
    const { goodsCode } = this.props;
    history.push("/goods/details?goodsCode=" + goodsCode);
  };

  handleAddToCart = (e, goodsCode) => {
    this.stopPropagation(e);

  };

  stopPropagation = (e) => {
    e && e.stopPropagation();
  };

  remove = async (e, record) => {
    this.stopPropagation(e);

    const result = await Dialog.confirm({
      content: "确定删除该商品吗？",
    });
    if (!result) {
      return;
    }
  };

  edit = (e, record) => {
    this.stopPropagation(e);

    history.push('/admin/goods/edit');
  };

  render() {
    const { goodsCode, goodsTitle, goodsSubtitle, goodsPrice, pictures } =
      this.props;
    const picture = pictures && pictures[0] ? pictures[0] : null;
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
          <img key={picture.pictureCode} src={picture.pictureUrl} />
        </div>
        <div className="baby-love-admin-goods-list-item-content">
          <p className="baby-love-admin-goods-list-item-title">{goodsTitle}</p>
          <p className="baby-love-admin-goods-list-item-subtitle">
            {goodsSubtitle}
          </p>
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

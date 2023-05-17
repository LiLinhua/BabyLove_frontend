import ShoppingBagIcon from "@/assets/shopping-bag.png";
import NoPictureIcon from "@/assets/no-picture.png";
import { DeleteOutline, EditSOutline } from "antd-mobile-icons";
import { Dialog } from "antd-mobile";

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
    history.push("/view/admin/goods/details?goodsCode=" + goodsCode);
  };

  handleAddToCart = (e, goodsCode) => {
    this.stopPropagation(e);

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
  };

  edit = (e, goodsCode) => {
    this.stopPropagation(e);

    history.push('/view/admin/goods/edit?goodsCode=' + goodsCode);
  };

  render() {
    const { goodsCode, goodsTitle, goodsSubtitle, goodsPrice, pictures } =
      this.props;
      console.log('=======props=======', this.props);
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
          <img key={picture.pictureCode} src={picture.pictureUrl || NoPictureIcon} />
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

import React from "react";
import { history } from 'umi';
import ShoppingBagIcon from "@/assets/shopping-bag.png";

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

  handleAddToCart = () => {
    const { goodsCode } = this.props;
  };

  render() {
    const { goodsCode, goodsTitle, goodsSubtitle, goodsPrice, pictures } =
      this.props;
    const picture = pictures && pictures[0] ? pictures[0] : null;
    return (
      <div className="baby-love-goods-list-item" onClick={this.handleItemClick}>
        <div className="baby-love-goods-list-item-picture">
          <img key={picture.pictureCode} src={picture.pictureUrl} />
        </div>
        <div className="baby-love-goods-list-item-content">
          <p className="baby-love-goods-list-item-title">{goodsTitle}</p>
          <p className="baby-love-goods-list-item-subtitle">{goodsSubtitle}</p>
          <p className="baby-love-goods-list-item-buy">
            <span className="baby-love-goods-list-item-price">
              ¥{goodsPrice}
            </span>
            <span
              className="baby-love-goods-list-item-add"
              onClick={this.handleAddToCart}
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

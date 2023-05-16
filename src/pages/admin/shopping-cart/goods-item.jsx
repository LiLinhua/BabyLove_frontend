import { Checkbox, Image, Input } from "antd-mobile";
import { AddCircleOutline, MinusCircleOutline } from "antd-mobile-icons";
import React from "react";

class GoodsItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { goodsItem, selectGoodsCodes, selectGoods, changeCount, stopPropagation } =
      this.props;
    return (
      <>
        <div
          className="baby-love-admin-shopping-cart-goods-select"
          onClick={stopPropagation}
        >
          <Checkbox
            checked={selectGoodsCodes.includes(goodsItem.goodsCode)}
            onChange={(value) => {
              selectGoods(goodsItem.goodsCode, value);
            }}
          />
        </div>
        <div className="baby-love-admin-shopping-cart-goods-picture">
          <Image
            src={goodsItem.pictures?.[0]?.pictureUrl}
            width="100%"
            height="100%"
            fit="contain"
            style={{ borderRadius: 4 }}
          />
        </div>
        <div className="baby-love-admin-shopping-cart-goods-buy-info">
          <p className="baby-love-admin-shopping-cart-goods-title">
            {goodsItem.goodsTitle}
          </p>
          {/* <p className="baby-love-admin-shopping-cart-goods-subtitle">
                  {goodsItem.goodsSubtitle}
                </p> */}
          <div className="baby-love-admin-shopping-cart-goods-price-count">
            <span className="baby-love-admin-shopping-cart-goods-price">
              ¥{goodsItem.goodsPrice}
            </span>
            <span className="baby-love-admin-shopping-cart-goods-count">
              <span
                onClick={(e) => {
                  changeCount(e, goodsItem, --goodsItem.goodsCount);
                  stopPropagation(e);
                }}
              >
                <MinusCircleOutline />
              </span>
              <Input
                value={goodsItem.goodsCount}
                type="number"
                min={1}
                max={999}
                onClick={stopPropagation}
                onChange={(value) => {
                  changeCount(null, goodsItem, value);
                }}
              />
              <AddCircleOutline
                onClick={(e) => {
                  changeCount(e, goodsItem, ++goodsItem.goodsCount);
                  stopPropagation(e);
                }}
              />
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default GoodsItem;

import NoPictureIcon from "@/assets/no-picture.png";
import { Checkbox, Ellipsis, Image, Input } from "antd-mobile";
import { AddCircleOutline, MinusCircleOutline } from "antd-mobile-icons";
import { goodsStatus as goodsStatusEnums } from "@/common/constant";
import React from "react";

class GoodsItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      goodsItem,
      selectGoodsCodes,
      selectGoods,
      changeCount,
      stopPropagation,
    } = this.props;
    const isOpacity = goodsItem.goodsStatus !== goodsStatusEnums.NORMAL.value || goodsItem.goodsInventory < 1;

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
            src={goodsItem.pictures?.[0]?.pictureUrl || NoPictureIcon}
            width="100%"
            height="100%"
            fit="contain"
            style={{ borderRadius: 4 }}
          />
          <span className="baby-love-admin-goods-list-item-inventory">
            {goodsItem.goodsStatus !== goodsStatusEnums.NORMAL.value ? '已下架' : goodsItem.goodsInventory < 1 ? '已售罄' : `仅剩${goodsItem.goodsInventory}件`}
          </span>
        </div>
        <div className={`baby-love-admin-shopping-cart-goods-buy-info ${isOpacity ? 'baby-love-opacity-disabled' : ''}`}>
          <p className="baby-love-admin-shopping-cart-goods-title">
            <Ellipsis direction="end" rows={2} content={goodsItem.goodsTitle} />
          </p>
          {/* <p className="baby-love-admin-shopping-cart-goods-subtitle">
                  {goodsItem.goodsSubtitle}
                </p> */}
          <div className="baby-love-admin-shopping-cart-goods-price-count">
            <span className="baby-love-admin-shopping-cart-goods-price">
              ¥{goodsItem.goodsPrice}
              <span className="baby-love-admin-shopping-cart-goods-origin-price">
                {goodsItem.goodsOriginPrice ? `¥${goodsItem.goodsOriginPrice}` : ""}
              </span>
            </span>

            <span className="baby-love-admin-shopping-cart-goods-count">
              <span
                onClick={(e) => {
                  changeCount(e, goodsItem, --goodsItem.buyCount);
                  stopPropagation(e);
                }}
              >
                <MinusCircleOutline />
              </span>
              <Input
                value={goodsItem.buyCount}
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
                  stopPropagation(e);
                  changeCount(e, goodsItem, ++goodsItem.buyCount);
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

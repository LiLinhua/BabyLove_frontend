import React from "react";
import GoodsItem from "./goods-item";

class GoodsList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      goodsList,
      selectGoodsCodes,
      selectGoods,
      changeCount,
      stopPropagation,
      toGoodsDetails,
    } = this.props;
    return (
      <>
        {goodsList.length ? (
          <ul>
            {goodsList.map((goodsItem) => (
              <li
                key={goodsItem.goodsCode}
                className="baby-love-admin-shopping-cart-goods-item"
                onClick={() => toGoodsDetails(goodsItem.goodsCode)}
              >
                <GoodsItem
                  goodsItem={goodsItem}
                  selectGoodsCodes={selectGoodsCodes}
                  selectGoods={selectGoods}
                  changeCount={changeCount}
                  stopPropagation={stopPropagation}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="baby-love-admin-shopping-cart-empty">暂无数据</div>
        )}
      </>
    );
  }
}

export default GoodsList;

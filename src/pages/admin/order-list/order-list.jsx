import React from "react";
import OrderItem from "./order-item";

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
        {goodsList && goodsList.length ? (
          <ul className="baby-love-admin-order-list-content">
            {goodsList.map((goodsItem) => (
              <li
                key={goodsItem.goodsCode}
                className="baby-love-admin-order-list-item"
                onClick={() => toGoodsDetails(goodsItem.goodsCode)}
              >
                <OrderItem
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
          <div className="baby-love-admin-order-list-empty">暂无数据</div>
        )}
      </>
    );
  }
}

export default GoodsList;

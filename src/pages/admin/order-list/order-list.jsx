import { DotLoading } from "antd-mobile";
import React from "react";
import OrderItem from "./order-item";

class GoodsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const {
      goodsList,
      selectGoodsCodes,
      selectGoods,
      changeCount,
      stopPropagation,
      toGoodsDetails,
      isShowLoading,
    } = this.props;

    if (isShowLoading) {
      return <DotLoading color="primary" />;
    }

    if (!goodsList?.length) {
      return <p className="baby-love-admin-order-list-empty">暂无数据</p>;
    }

    return (
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
    );
  }
}

export default GoodsList;

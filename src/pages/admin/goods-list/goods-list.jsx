import { Component } from "react";
import { DotLoading } from "antd-mobile";
import GoodsItem from './goods-item';

class GoodsList extends Component {
  render() {
    const { goodsList, isLoading, getGoodsList } = this.props;

    let content = <DotLoading color="primary" />;
    if (!goodsList?.length) {
      if (!isLoading) {
        content = <p className="baby-love-admin-goods-list-empty">暂无数据</p>;
      }
    } else {
      content = (
        <>
          {goodsList.map((goods) => (
            <GoodsItem
              key={goods.goodsCode}
              goodsTitle={goods.goodsTitle}
              goodsSubtitle={goods.goodsSubtitle}
              goodsPrice={goods.goodsPrice}
              pictures={goods.pictures}
              goodsCode={goods.goodsCode}
              goodsInventory={goods.goodsInventory}
              getGoodsList={getGoodsList}
            />
          ))}
        </>
      );
    }

    return <div className="baby-love-admin-goods-list">{content}</div>;
  }
}

export default GoodsList;

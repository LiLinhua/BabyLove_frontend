import { Component } from "react";
import { DotLoading } from "antd-mobile";
import GoodsItem from './goods-item';

class GoodsList extends Component {
  render() {
    const { goodsList, isLoading, getGoodsList } = this.props;

    // 默认 Loading 效果
    let content = <DotLoading color="primary" />;
    if (!goodsList?.length) {
      if (!isLoading) {
        content = <p className="baby-love-custom-goods-list-empty">暂无数据</p>;
      }
    } else {
      content = (
        <>
          {goodsList.map((goods) => (
            <GoodsItem
              key={goods.goodsCode}
              goodsTitle={goods.goodsTitle}
              goodsStatus={goods.goodsStatus}
              goodsSubtitle={goods.goodsSubtitle}
              goodsPrice={goods.goodsPrice}
              goodsOriginPrice={goods.goodsOriginPrice}
              pictures={goods.pictures}
              goodsCode={goods.goodsCode}
              goodsInventory={goods.goodsInventory}
              getGoodsList={getGoodsList}
            />
          ))}
        </>
      );
    }

    return <div className="baby-love-custom-goods-list">{content}</div>;
  }
}

export default GoodsList;

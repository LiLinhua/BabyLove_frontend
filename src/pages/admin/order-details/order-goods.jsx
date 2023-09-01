import { Ellipsis } from "antd-mobile";
import NoPictureIcon from "@/assets/no-picture.png";
import { goTo } from "@/common/utils";
import React from "react";

import "./index.less";

class OrderGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 去商品详情
   */
  toGoodsDetail = (goodsCode) => {
    goTo(`/goods/details?goodsCode=${goodsCode}`)
  }

  /**
   * 渲染函数
   */
  render() {
    const { goods, totalCount } = this.props;
    return (
      <div className="baby-love-admin-order-details-goods">
        <div className="baby-love-admin-order-details-goods-header">
          <span className="baby-love-admin-order-details-goods-total-shop">
            BabyLove
          </span>
          <span className="baby-love-admin-order-details-goods-total-count">
            共 {totalCount} 件商品
          </span>
        </div>
        <ul>
          {(goods || []).map((item) => (
            <li key={item} onClick={() => this.toGoodsDetail(item.goodsCode)}>
              <div className="baby-love-admin-order-details-goods-picture" style={{ backgroundImage: `url(${item.pictures?.[0]?.pictureUrl || NoPictureIcon})`}}></div>
              <div className="baby-love-admin-order-details-goods-info">
                <div className="baby-love-admin-order-details-goods-title">
                  <Ellipsis
                    direction="end"
                    rows={2}
                    content={item.goodsTitle}
                  />
                </div>
                <div className="baby-love-admin-order-details-goods-details">
                  <span className="baby-love-admin-order-details-goods-item-price">
                    ¥{item.goodsPrice}
                    <span className="baby-love-admin-order-details-goods-item-origin-price">
                      {item.goodsOriginPrice ? `¥${item.goodsOriginPrice}` : ""}
                    </span>
                  </span>
                  <span className="baby-love-admin-order-details-goods-item-count">
                    x{item.ordersGoodsRelations?.buyCount || '?'}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default OrderGoods;

import { Ellipsis } from "antd-mobile";
import React from "react";

import "./index.less";

class OrderGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 渲染函数
   */
  render() {
    return (
      <div className="baby-love-admin-order-details-goods">
        <div className="baby-love-admin-order-details-goods-header">
          <span className="baby-love-admin-order-details-goods-total-shop">
            BabyLove
          </span>
          <span className="baby-love-admin-order-details-goods-total-count">
            共 12 件商品
          </span>
        </div>
        <ul>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <li key={item}>
              <div className="baby-love-admin-order-details-goods-picture"></div>
              <div>
                <div className="baby-love-admin-order-details-goods-title">
                  <Ellipsis
                    direction="end"
                    rows={2}
                    content={
                      "斯柯达尖峰时刻京东方时空的房间里纳斯达克雷锋精神凉快点附近收代理费会计师独立开发"
                    }
                  />
                </div>
                <div className="baby-love-admin-order-details-goods-details">
                  <span className="baby-love-admin-order-details-goods-item-price">
                    ¥2345
                  </span>
                  <span className="baby-love-admin-order-details-goods-item-count">
                    x3
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

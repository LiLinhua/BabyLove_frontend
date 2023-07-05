import { Ellipsis, Dialog, Toast, Input } from "antd-mobile";
import { DeleteOutline, EditSOutline } from "antd-mobile-icons";
import React from "react";

import "./index.less";

class OrderGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 阻止事件冒泡
   * @param {event} e
   */
  stopPropagation = (e) => {
    e && e.stopPropagation();
  };

  /**
   * 删除商品
   * @param {event} e 事件
   * @param {string} goodsCode 商品编码
   * @returns
   */
  remove = async (e, goodsCode) => {
    this.stopPropagation(e);

    const result = await Dialog.confirm({
      content: "确定删除该商品吗？",
    });
    if (!result) {
      return;
    }
    // const { success } = await request.post(adminRemoveGoods, { goodsCode });
    // if (success) {
    //   Toast.show({
    //     icon: "success",
    //     content: "删除成功！",
    //   });
    //   this.props.getGoodsList();
    // }
  };

  /**
   * 去编辑商品
   * @param {event} e 事件
   * @param {string} goodsCode 商品编码
   */
  edit = (e, goodsCode) => {
    this.stopPropagation(e);
    Dialog.alert({
      content: (<Input type="number" placeholder="请输入商品数量"/>),
      confirmText: '确定',
      onConfirm: () => {
        console.log('Confirmed')
      },
    });
  };

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
              <div className="baby-love-admin-order-details-goods-item-actions">
                <span onClick={this.edit}>
                  编辑 <EditSOutline />
                </span>
                <span onClick={this.remove}>
                  删除 <DeleteOutline />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default OrderGoods;

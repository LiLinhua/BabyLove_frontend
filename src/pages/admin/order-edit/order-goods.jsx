import NoPictureIcon from "@/assets/no-picture.png";
import { adminUpdateOrderGoodsBuyCount } from "@/common/apis";
import request from "@/common/http";
import { goTo } from "@/common/utils";
import { orderStatus } from "@/common/constant";
import { Dialog, Ellipsis, Input, Toast } from "antd-mobile";
import { DeleteOutline, EditSOutline } from "antd-mobile-icons";
import React from "react";

import "./index.less";

class OrderGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyCount: props.buyCount,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ buyCount: nextProps.buyCount });
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
    this.setState({ buyCount: 0 }, () => {
      this.comfirmEditBuyCount(goodsCode);
    });
  };

  /**
   * 确定添加商品
   */
  comfirmEditBuyCount = async (goodsCode) => {
    const { buyCount } = this.state;
    const { flushOrderDetails } = this.props;

    const { success, message } = await request.post(
      adminUpdateOrderGoodsBuyCount,
      {
        orderCode: this.props.orderCode,
        goodsCode,
        buyCount: +buyCount,
      }
    );

    if (success) {
      Toast.show({
        content: "更新成功",
        icon: "success",
      });
      flushOrderDetails();
    } else {
      Toast.show({
        content: message || "更新失败，请稍后再试",
        icon: "fail",
      });
    }
  };

  /**
   * 修改购买数量
   */
  changeBuyCount = (value) => {
    this.setState({ buyCount: value });
  };

  /**
   * 去编辑商品
   * @param {event} e 事件
   * @param {string} goodsCode 商品编码
   * @param {number} buyCount 购买数量
   */
  edit = (e, goodsCode, buyCount) => {
    this.stopPropagation(e);

    this.setState(
      {
        buyCount,
      },
      () => {
        Dialog.confirm({
          content: (
            <Input
              type="number"
              defaultValue={this.state.buyCount}
              placeholder="请输入商品数量"
              onChange={this.changeBuyCount}
            />
          ),
          confirmText: "确定",
          onConfirm: async () => {
            await this.comfirmEditBuyCount(goodsCode);
          },
        });
      }
    );
  };

  /**
   * 去商品详情
   */
  toGoodsDetail = (goodsCode) => {
    goTo(`/goods/details?goodsCode=${goodsCode}`);
  };

  /**
   * 渲染函数
   */
  render() {
    const { goods, totalCount } = this.props;
    const isCanNotUpdateOrderGoods =
      this.props.orderStatus !== orderStatus.WAIT_PAY.value;
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
              <div
                className="baby-love-admin-order-details-goods-picture"
                style={{
                  backgroundImage: `url(${
                    item.pictures?.[0]?.pictureUrl || NoPictureIcon
                  })`,
                }}
              ></div>
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
                    ¥ {item.goodsPrice}
                  </span>
                  <span className="baby-love-admin-order-details-goods-item-count">
                    x{item.ordersGoodsRelations?.buyCount || "?"}
                  </span>
                </div>
              </div>
              <div className="baby-love-admin-order-details-goods-item-actions" style={isCanNotUpdateOrderGoods ? { pointerEvents: 'none', opacity: .5 } : null}>
                <span
                  onClick={(e) =>
                    this.edit(
                      e,
                      item.goodsCode,
                      item.ordersGoodsRelations?.buyCount
                    )
                  }
                >
                  编辑 <EditSOutline />
                </span>
                <span onClick={(e) => this.remove(e, item.goodsCode)}>
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

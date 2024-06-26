import NoPictureIcon from "@/assets/no-picture.png";
import { copy, goTo } from "@/common/utils";
import { adminRemoveOrder } from "@/common/apis";
import request from "@/common/http";
import { Button, Ellipsis, Toast, Dialog } from "antd-mobile";
import React from "react";
import { orderStatus } from "@/common/constant";

class GoodsItem extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * 复制单号
   */
  copyOrderNumber = () => {
    const { orderItem } = this.props;
    if (copy(orderItem.orderCode)) {
      Toast.show({
        icon: "success",
        content: "复制成功",
      });
      return;
    }
    Toast.show({
      icon: "fail",
      content: "复制失败",
    });
  };

  /**
   * 查看物流
   */
  lookLogistics = () => {
    const { orderItem } = this.props;
    if (!orderItem.expressCode) {
      return Toast.show({
        icon: "fail",
        content: "暂无物流信息",
      });
    }
    if (copy(orderItem.expressCode)) {
      Toast.show({
        icon: "success",
        content: "物流单号已复制，跳转查询中...",
        duration: 2000,
      });
      setTimeout(() => {
        window.open("https://m.kuaidi100.com/index.jsp");
      }, 2000);

      return;
    }
    Toast.show({
      icon: "fail",
      content: "物流单号复制失败",
    });
  };

  /**
   * 修改订单
   */
  updateOrder = () => {
    goTo(`/order/edit?orderCode=${this.props.orderItem.orderCode}`);
  };

  /**
   * 删除订单
   */
  removeOrder = async () => {
    const result = await Dialog.confirm({
      content: "确定删除订单吗？",
    });
    if (!result) {
      return;
    }

    const { success, message } = await request.post(adminRemoveOrder, { orderCode: this.props.orderItem.orderCode });

    if (!success) {
      Toast.show({
        icon: "fail",
        content: message || "删除失败",
      });
      return;
    }

    Toast.show({
      icon: "success",
      content: "删除成功",
    });
    this.props.getOrderList();
  };

  render() {
    const { orderItem, stopPropagation } = this.props;
    const isCanNotUpdateOrder = [
      orderStatus.FINISHED.value,
      orderStatus.CANCELED.value,
    ].includes(orderItem.status);
    return (
      <div>
        <div className="baby-love-admin-order-list-item-header">
          <span className="baby-love-admin-order-list-item-header-left">
            <span className="baby-love-admin-order-list-item-number">
              {orderItem.orderCode}
            </span>
            <span className="baby-love-admin-order-list-item-time">
              {orderItem.createdAt}
            </span>
          </span>
          <span className="baby-love-admin-order-list-item-status">
            {orderStatus[orderItem.status]?.title || "未知"}
          </span>
        </div>
        <div className="baby-love-admin-order-list-goods-picture">
          <ul>
            {orderItem.goods &&
              orderItem.goods.map((goodsItem) => {
                return (
                  <li key={goodsItem.goodsCode}>
                    <div
                      className="baby-love-admin-order-list-goods-picture-content"
                      style={{
                        backgroundImage: `url(${
                          goodsItem.pictures?.[0]?.pictureUrl || NoPictureIcon
                        })`,
                      }}
                    ></div>
                    <Ellipsis
                      direction="end"
                      rows={1}
                      content={goodsItem.goodsTitle}
                    />
                    <span className="baby-love-admin-order-list-goods-count">
                      X{goodsItem.ordersGoodsRelations?.buyCount || "?"}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
        <div
          className="baby-love-admin-order-list-item-footer"
          onClick={stopPropagation}
        >
          <div className="baby-love-admin-order-list-item-price">
            <span className="baby-love-admin-order-list-item-price-label">
              实付：
            </span>
            ¥{orderItem.totalPrice}
          </div>
          <div className="baby-love-admin-order-list-item-actions">
            <Button color="primary" fill="none" onClick={this.copyOrderNumber}>
              复制单号
            </Button>
            <Button
              color="primary"
              fill="none"
              disabled={!orderItem.expressCode}
              onClick={this.lookLogistics}
            >
              查看物流
            </Button>
            <Button color="primary" disabled={isCanNotUpdateOrder} fill="none" onClick={this.updateOrder}>
              修改
            </Button>
            <Button color="primary" fill="none" onClick={this.removeOrder}>
              删除
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default GoodsItem;

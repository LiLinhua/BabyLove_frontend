import { copy } from "@/common/utils";
import { Button, Ellipsis, Toast } from "antd-mobile";
import { payWays } from "@/common/constant";
import React from "react";

import "./index.less";

class OrderBaseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 复制物流单号
   */
  copyExpressCode = () => {
    const copyResult = copy(this.props.expressCode);
    if (copyResult) {
      Toast.show({ content: "复制成功", icon: "success" });
    } else {
      Toast.show({ content: "复制失败，请手动复制", icon: "fail" });
    }
  };

  /**
   * 渲染函数
   */
  render() {
    const {
      orderCode,
      createdAt,
      totalPrice,
      expressWay,
      expressCode,
      expressAddress,
      payWay,
      user,
    } = this.props;
    return (
      <div className="baby-love-admin-order-details-base-info">
        <div className="baby-love-admin-order-details-base-info-item">
          <span>订单编号：</span>
          <span>{orderCode}</span>
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>订单时间：</span>
          <span>{createdAt}</span>
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>订单总价：</span>
          <span>¥{totalPrice}</span>
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>关联用户：</span>
          <span>
            <Ellipsis
              direction="end"
              rows={1}
              content={
                user
                  ? `${user.userName}(${user.userNickname || user.userCode})`
                  : "-"
              }
            />
          </span>
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>支付方式：</span>
          <span>{payWays[payWay]?.title || "-"}</span>
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>配送方式：</span>
          <span>{expressWay || "-"}</span>
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>快递单号：</span>
          <span>{expressCode || "-"}</span>
          {expressCode && (
            <Button
              color="primary"
              disabled={!expressCode}
              fill="none"
              onClick={expressCode ? this.copyExpressCode : null}
            >
              复制快递单号
            </Button>
          )}
        </div>
        <div className="baby-love-admin-order-details-base-info-item">
          <span>配送地址：</span>
          <span>{expressAddress || "-"}</span>
        </div>
      </div>
    );
  }
}

export default OrderBaseInfo;

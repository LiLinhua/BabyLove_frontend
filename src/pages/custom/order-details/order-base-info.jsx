import { copy } from "@/common/utils";
import { Button, Toast } from "antd-mobile";
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
    const { orderCode, createdAt, totalPrice, expressWay, expressCode } =
      this.props;
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
      </div>
    );
  }
}

export default OrderBaseInfo;

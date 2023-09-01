import { adminAddOrderGoods, adminUpdateOrderBaseInfo } from "@/common/apis";
import { orderStatus } from "@/common/constant";
import request from "@/common/http";
import { copy } from "@/common/utils";
import { Button, Dialog, Form, Input, Toast } from "antd-mobile";
import React from "react";
import UserSignature from "./user-signature";

import "./index.less";

class OrderActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCanceling: false,
    };
  }

  formRef = React.createRef();

  /**
   * 查看物流
   */
  lookLogistics = () => {
    if (copy(this.props.expressCode)) {
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
   * 取消订单
   */
  cancelOrder = async () => {
    const result = await Dialog.confirm({
      content: "确定取消订单吗？",
    });
    if (!result) {
      return;
    }
    this.setState({ isCanceling: true });
    const { success, message } = await request.post(adminUpdateOrderBaseInfo, {
      orderCode: this.props.orderCode,
      orderStatus: orderStatus.CANCELED.value,
    });
    if (!success) {
      Toast.show({
        content: message || "取消失败，请稍后再试",
        icon: "fail",
      });
    } else {
      Toast.show({
        content: "取消成功",
        icon: "success",
      });
      this.props.flushOrderDetails();
    }
    this.setState({ isCanceling: false });
  };

  /**
   * 确定添加商品
   */
  comfirmAddOrder = async () => {
    const { goodsCode, buyCount } = await this.formRef.current.validateFields();

    const { success, message } = await request.post(adminAddOrderGoods, {
      orderCode: this.props.orderCode,
      goodsCode,
      buyCount: +buyCount,
    });

    if (success) {
      Toast.show({
        content: "添加成功",
        icon: "success",
      });
      this.props.flushOrderDetails();
    } else {
      Toast.show({
        content: message || "添加失败，请稍后再试",
        icon: "fail",
      });
    }
  };

  /**
   * 添加商品
   */
  addGoods = () => {
    Dialog.confirm({
      content: (
        <div>
          <Form
            ref={this.formRef}
            className="baby-love-admin-order-details-add-goods"
            layout="horizontal"
          >
            <Form.Item
              name="goodsCode"
              label="商品编码"
              rules={[{ required: true, message: "商品编码不能为空" }]}
            >
              <Input placeholder="请输入商品编码" />
            </Form.Item>
            <Form.Item
              name="buyCount"
              label="购买数量"
              rules={[{ required: true, message: "购买数量不能为空" }]}
            >
              <Input type="number" placeholder="请输入购买数量" />
            </Form.Item>
          </Form>
        </div>
      ),
      confirmText: "确定",
      onConfirm: this.comfirmAddOrder,
    });
  };

  /**
   * 渲染函数
   */
  render() {
    const isCanNotCancelOrder = [
      orderStatus.FINISHED.value,
      orderStatus.CANCELED.value,
    ].includes(this.props.orderStatus);
    const isCanNotAddOrder =
      this.props.orderStatus !== orderStatus.WAIT_PAY.value;
    const { orderCode, expressCode, flushOrderDetails, userSignature } = this.props;
    return (
      <div className="baby-love-admin-order-details-actions">
        <Button
          color="primary"
          loading={this.state.isCanceling}
          disabled={isCanNotCancelOrder}
          onClick={this.cancelOrder}
        >
          取消订单
        </Button>
        {expressCode ? (
          <Button
            color="primary"
            disabled={!expressCode}
            onClick={this.lookLogistics}
          >
            查询物流
          </Button>
        ) : null}

        {isCanNotAddOrder ? null : (
          <Button
            color="primary"
            disabled={isCanNotAddOrder}
            onClick={this.addGoods}
          >
            添加商品
          </Button>
        )}
        <UserSignature orderCode={orderCode} isCanNotModify={isCanNotCancelOrder} flushOrderDetails={flushOrderDetails} userSignature={userSignature}/>
      </div>
    );
  }
}

export default OrderActions;

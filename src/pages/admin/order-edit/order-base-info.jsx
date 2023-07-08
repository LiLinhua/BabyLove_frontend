import { Button, Form, Input, Toast } from "antd-mobile";
import React from "react";
import { adminUpdateOrderBaseInfo } from "@/common/apis";
import request from "@/common/http";
import { orderStatus } from "@/common/constant";

import "./index.less";

class OrderBaseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSavingExpress: false,
    };
  }

  formRef = React.createRef();

  componentWillReceiveProps(nextProps){
    this.formRef.current.setFieldsValue({
      orderCode: nextProps.orderCode,
      createdAt: nextProps.createdAt,
      totalPrice: nextProps.totalPrice,
      expressWay: nextProps.expressWay,
      expressCode: nextProps.expressCode,
    });
  }

  /**
   * 保存物流信息
   */
  saveExpress = async () => {
    const { orderCode } = this.props;
    const { expressWay, expressCode } = this.formRef.current.getFieldsValue([
      "expressWay",
      "expressCode",
    ]);
    this.setState({ isSavingExpress: true });
    const { success, message } = await request.post(adminUpdateOrderBaseInfo, {
      orderCode,
      expressWay,
      expressCode,
    });
    if (success) {
      Toast.show({
        content: "保存成功",
        icon: "success",
      });
    } else {
      Toast.show({
        content: message || "保存失败，请稍后再试",
        icon: "success",
      });
    }
    this.setState({ isSavingExpress: false });
  };

  /**
   * 渲染函数
   */
  render() {
    const { orderCode, createdAt, totalPrice, expressWay, expressCode } =
      this.props;

    const isCanNotUpdateOrder = [orderStatus.WAIT_GET.value, orderStatus.FINISHED.value, orderStatus.CANCELED.value].includes(this.props.orderStatus);
    return (
      <div className="baby-love-admin-order-details-base-info">
        <Form ref={this.formRef} layout="horizontal">
          <Form.Item
            name="orderCode"
            label="订单编号"
            initialValue={orderCode || "-"}
            rules={[{ required: true, message: "订单编号不能为空" }]}
          >
            <Input readOnly placeholder="请输入订单号" />
          </Form.Item>
          <Form.Item
            name="createdAt"
            label="订单时间"
            initialValue={createdAt || "-"}
            rules={[{ required: true, message: "订单时间不能为空" }]}
          >
            <Input readOnly placeholder="请输入订单时间" />
          </Form.Item>
          <Form.Item
            name="totalPrice"
            label="订单总价"
            initialValue={`¥${totalPrice || "-"}`}
            rules={[{ required: true, message: "订单总价不能为空" }]}
          >
            <Input readOnly placeholder="请输入订单总价" />
          </Form.Item>
          <Form.Item
            name="expressWay"
            label="配送方式"
            initialValue={`${expressWay || ""}`}
            rules={[{ required: false, message: "配送方式不能为空" }]}
          >
            <Input disabled={isCanNotUpdateOrder} placeholder="请输入配送方式" />
          </Form.Item>
          <Form.Item
            name="expressCode"
            label="快递单号"
            initialValue={`${expressCode || ""}`}
            rules={[{ required: false, message: "快递单号不能为空" }]}
          >
            <Input disabled={isCanNotUpdateOrder} placeholder="请输入快递单号" />
          </Form.Item>
          <Form.Item
            name="submit"
            className="baby-love-admin-order-details-base-info-save"
          >
            <Button
              color="primary"
              disabled={isCanNotUpdateOrder} 
              loading={this.state.isSavingExpress}
              onClick={this.saveExpress}
            >
              保存物流
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default OrderBaseInfo;

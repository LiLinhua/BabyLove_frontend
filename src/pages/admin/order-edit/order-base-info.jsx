import { Form, Input } from "antd-mobile";
import React from "react";

import "./index.less";

class OrderBaseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 渲染函数
   */
  render() {
    return (
      <div className="baby-love-admin-order-details-base-info">
        <Form layout="horizontal">
          <Form.Item
            name="orderNumber"
            label="订单编号"
            initialValue={"243234234234"}
            rules={[{ required: true, message: "订单编号不能为空" }]}
          >
            <Input onChange={console.log} readOnly placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="orderTime"
            label="订单时间"
            initialValue={"2023-07-09 12:00:00"}
            rules={[{ required: true, message: "订单时间不能为空" }]}
          >
            <Input
              onChange={console.log}
              readOnly
              placeholder="请输入订单时间"
            />
          </Form.Item>
          <Form.Item
            name="orderTotalPrice"
            label="订单总价"
            initialValue={"¥1234"}
            rules={[{ required: true, message: "订单总价不能为空" }]}
          >
            <Input
              onChange={console.log}
              readOnly
              placeholder="请输入订单总价"
            />
          </Form.Item>
          <Form.Item
            name="express"
            label="配送方式"
            rules={[{ required: false, message: "配送方式不能为空" }]}
          >
            <Input onChange={console.log} placeholder="请输入配送方式" />
          </Form.Item>
          <Form.Item
            name="expressNumber"
            label="快递单号"
            rules={[{ required: false, message: "快递单号不能为空" }]}
          >
            <Input onChange={console.log} placeholder="请输入快递单号" />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default OrderBaseInfo;

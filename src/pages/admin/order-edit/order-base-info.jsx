import { adminUpdateOrderBaseInfo } from "@/common/apis";
import { orderStatus, orderTitleMapToStatus } from "@/common/constant";
import request from "@/common/http";
import { Button, Form, Input, Picker, Toast } from "antd-mobile";
import React from "react";

import "./index.less";

class OrderBaseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSavingExpress: false,
      isShowOrderStatusPicker: false,
    };
    this.orderStatusColumns = [
      Object.values(orderStatus).map((status) => {
        return { label: status.title, value: status.value };
      }),
    ];
  }

  formRef = React.createRef();

  componentWillReceiveProps(nextProps) {
    this.formRef.current.setFieldsValue({
      orderCode: nextProps.orderCode,
      status: orderStatus[nextProps.orderStatus].title,
      createdAt: nextProps.createdAt,
      totalPrice: nextProps.totalPrice,
      expressWay: nextProps.expressWay,
      expressCode: nextProps.expressCode,
      expressAddress: nextProps.expressAddress,
      selectedUser: nextProps.selectedUser,
    });
  }

  /**
   * 保存订单基础信息
   */
  saveOrder = async () => {
    const { orderCode, flushOrderDetails, selectedUser } = this.props;
    const { expressWay, expressCode, expressAddress, status, userCode } =
      this.formRef.current.getFieldsValue([
        "expressWay",
        "expressCode",
        "expressAddress",
        "status",
        "userCode",
      ]);
    this.setState({ isSavingExpress: true });
    const { success, message } = await request.post(adminUpdateOrderBaseInfo, {
      orderCode,
      expressWay,
      expressCode,
      expressAddress,
      orderStatus: orderTitleMapToStatus[status].value,
      userCode: selectedUser?.userCode
    });
    if (success) {
      Toast.show({
        content: "保存成功",
        icon: "success",
      });
      flushOrderDetails();
    } else {
      Toast.show({
        content: message || "保存失败，请稍后再试",
        icon: "success",
      });
    }
    this.setState({ isSavingExpress: false });
  };

  /**
   * 显示|隐藏订单状态选择框
   */
  handleOrderStatusPickerShow = (isShowOrderStatusPicker) => {
    this.setState({ isShowOrderStatusPicker });
  };

  /**
   * 设置订单状态
   */
  setOrderStatus = (status) => {
    this.formRef.current.setFieldsValue({
      status: orderStatus[status].title,
    });
    this.handleOrderStatusPickerShow(false);
  };

  /**
   * 渲染函数
   */
  render() {
    const { isShowOrderStatusPicker } = this.state;
    const {
      orderCode,
      createdAt,
      totalPrice,
      expressWay,
      expressCode,
      expressAddress,
      showSelectUserModal,
      selectedUser,
    } = this.props;

    const isCanNotUpdateOrder = [
      // orderStatus.WAIT_GET.value,
      orderStatus.FINISHED.value,
      orderStatus.CANCELED.value,
    ].includes(this.props.orderStatus);
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
            name="status"
            label="订单状态"
            initialValue={`${orderStatus[this.props.orderStatus]?.title || ""}`}
            rules={[{ required: false, message: "订单状态不能为空" }]}
            onClick={
              isCanNotUpdateOrder
                ? null
                : () => this.handleOrderStatusPickerShow(true)
            }
          >
            <Input placeholder="请选择订单状态" readOnly />
          </Form.Item>
          <Form.Item
            name="userCode"
            label="关联用户"
            initialValue={
              selectedUser
                ? `${selectedUser.userName}(${selectedUser.userNickname || selectedUser.userCode})`
                : ""
            }
            rules={[{ required: false, message: "关联用户不能为空" }]}
            onClick={showSelectUserModal}
          >
            <Input placeholder="请关联用户" readOnly />
          </Form.Item>
          <Form.Item
            name="expressWay"
            label="配送方式"
            initialValue={`${expressWay || ""}`}
            rules={[{ required: false, message: "配送方式不能为空" }]}
          >
            <Input
              disabled={isCanNotUpdateOrder}
              placeholder="请输入配送方式"
            />
          </Form.Item>
          <Form.Item
            name="expressCode"
            label="快递单号"
            initialValue={`${expressCode || ""}`}
            rules={[{ required: false, message: "快递单号不能为空" }]}
          >
            <Input
              disabled={isCanNotUpdateOrder}
              placeholder="请输入快递单号"
            />
          </Form.Item>
          <Form.Item
            name="expressAddress"
            label="配送地址"
            initialValue={`${expressAddress || ""}`}
            rules={[{ required: false, message: "配送地址不能为空" }]}
          >
            <Input
              disabled={isCanNotUpdateOrder}
              placeholder="请输入配送地址"
            />
          </Form.Item>
          <Form.Item
            name="submit"
            className="baby-love-admin-order-details-base-info-save"
          >
            <Button
              color="primary"
              disabled={isCanNotUpdateOrder}
              loading={this.state.isSavingExpress}
              onClick={this.saveOrder}
            >
              保存
            </Button>
          </Form.Item>
        </Form>
        <Picker
          columns={this.orderStatusColumns}
          visible={isShowOrderStatusPicker}
          onClose={() => this.handleOrderStatusPickerShow(false)}
          // onClick={() => this.handleOrderStatusPickerShow(true)}
          placeholder="请选择订单状态"
          // value={value}
          onConfirm={this.setOrderStatus}
        />
      </div>
    );
  }
}

export default OrderBaseInfo;

import { DotLoading } from "antd-mobile";
import DayJS from "dayjs";
import React from "react";
import {
  adminQueryAllUsers,
  adminQueryOrderDetails,
} from "../../../common/apis";
import request from "../../../common/http";
import OrderActions from "./order-actions";
import OrderBaseInfo from "./order-base-info";
import OrderGoods from "./order-goods";
import OrderStatus from "./order-status";
import UserSelectModal from "./user-select-modal";

import "./index.less";

class OrderEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDetails: {},
      isShowLoading: false,
      userList: [],
      showUserList: [],
      isShowSelectUserModal: false,
      isShowModalLoading: false,
      selectedUser: null,
    };
    // 产品编码
    const searchParams = new URLSearchParams(location.search);
    this.orderCode = searchParams.get("orderCode");
  }

  orderBaseInfoRef = React.createRef();

  componentDidMount() {
    this.getOrderDetails();
  }

  /**
   * 设置 loading 效果
   * @param {boolean} isShowLoading 是否显示 loading 效果
   */
  setLoading = (isShowLoading) => {
    this.setState({ isShowLoading });
  };

  /**
   * 获取订单详情
   */
  getOrderDetails = async () => {
    if (!this.orderCode) {
      return;
    }
    this.setLoading(true);
    const { data } = await request.post(adminQueryOrderDetails, {
      orderCode: this.orderCode,
    });
    if (data) {
      data.createdAt = DayJS(data.createdAt).format("YYYY-MM-DD HH:mm:ss");
      this.setState({ orderDetails: data, selectedUser: data.user });
    }
    this.setLoading(false);
  };

  /**
   * 获取用户列表
   */
  getUserList = async () => {
    this.setState({ isShowModalLoading: true });
    let { data } = await request.post(adminQueryAllUsers);
    data = data.list;
    this.setState({
      isShowModalLoading: false,
      userList: data,
      showUserList: data,
    });
  };

  /**
   * 显示选择用户弹窗
   */
  showSelectUserModal = () => {
    const { userList } = this.state;
    if (!userList || userList.length < 1) {
      this.getUserList();
    }
    this.setState({ isShowSelectUserModal: true });
  };

  /**
   * 关闭选择用户弹窗
   */
  closeSelectUserModal = () => {
    this.setState({ isShowSelectUserModal: false });
  };

  /**
   * 搜索用户
   * @param {string} keyword 关键词
   */
  searchUser = async (keyword) => {
    this.setState({
      showUserList: this.state.userList.filter((user) => {
        return (
          user.userName.indexOf(keyword) > -1 ||
          (user.userNickname || "").indexOf(keyword) > -1 ||
          (user.userPhone || "").indexOf(keyword) > -1 ||
          user.userCode.indexOf(keyword) > -1
        );
      }),
    });
  };

  /**
   * 选择用户
   * @param {Object} user 用户信息
   */
  selectUser = async (user) => {
    this.orderBaseInfoRef.current.formRef?.current?.setFieldsValue({
      userCode: user
        ? `${user.userName}(${user.userNickname || user.userCode})`
        : "",
    });
    this.setState({ selectedUser: user, isShowSelectUserModal: false });
  };

  /**
   * 渲染函数
   */
  render() {
    const {
      status,
      orderCode,
      expressWay,
      expressCode,
      expressAddress,
      totalPrice,
      createdAt,
      goods,
      totalCount,
      userSignature,
    } = this.state.orderDetails || {};
    const {
      showUserList,
      isShowSelectUserModal,
      isShowModalLoading,
      selectedUser,
    } = this.state;

    return (
      <div className="baby-love-admin-order-details">
        {this.state.isShowLoading ? (
          <DotLoading color="primary" />
        ) : (
          <>
            <div className="baby-love-admin-order-details-info">
              <OrderStatus orderStatus={status} />
              <OrderBaseInfo
                ref={this.orderBaseInfoRef}
                orderCode={orderCode}
                createdAt={createdAt}
                orderStatus={status}
                expressWay={expressWay}
                expressCode={expressCode}
                expressAddress={expressAddress}
                totalPrice={totalPrice}
                selectedUser={selectedUser}
                flushOrderDetails={this.getOrderDetails}
                showSelectUserModal={this.showSelectUserModal}
              />
              <OrderGoods
                goods={goods}
                orderStatus={status}
                totalCount={totalCount}
                orderCode={orderCode}
                flushOrderDetails={this.getOrderDetails}
              />
            </div>
            <OrderActions
              orderCode={orderCode}
              orderStatus={status}
              expressCode={expressCode}
              userSignature={userSignature}
              flushOrderDetails={this.getOrderDetails}
            />
          </>
        )}
        <UserSelectModal
          isShowSelectUserModal={isShowSelectUserModal}
          isShowModalLoading={isShowModalLoading}
          userList={showUserList}
          selectUser={this.selectUser}
          closeModal={this.closeSelectUserModal}
          searchUser={this.searchUser}
        />
      </div>
    );
  }
}

export default OrderEdit;

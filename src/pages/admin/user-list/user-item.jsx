import { adminRemoveUser } from "@/common/apis";
import request from "@/common/http";
import { goTo } from "@/common/utils";
import { Button, Dialog, Toast } from "antd-mobile";
import React from "react";

class GoodsItem extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * 修改用户
   */
  updateUser = () => {
    goTo(`/user/edit?userCode=${this.props.userItem.userCode}`);
  };

  /**
   * 删除用户
   */
  removeUser = async () => {
    const result = await Dialog.confirm({
      content: "确定删除用户吗？",
    });
    if (!result) {
      return;
    }

    const { success, message } = await request.post(adminRemoveUser, {
      userCode: this.props.userItem.userCode,
    });

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
    this.props.getUserList();
  };

  render() {
    const { userItem, stopPropagation } = this.props;
    return (
      <div className="baby-love-admin-user-list-item">
        <div className="baby-love-admin-user-list-item-main">
          <div className="baby-love-admin-user-list-item-body">
            <div className="baby-love-admin-user-list-item-body-label">
              用户名：
            </div>
            <div className="baby-love-admin-user-list-item-body-content">
              {userItem.userName || "--"}
            </div>
          </div>
          <div className="baby-love-admin-user-list-item-body">
            <div className="baby-love-admin-user-list-item-body-label">
              手机号：
            </div>
            <div className="baby-love-admin-user-list-item-body-content">
              {userItem.userPhone ? (
                <a href={`tel:${userItem.userPhone}`}>{userItem.userPhone}</a>
              ) : (
                userItem.userPhone
              )}
            </div>
          </div>
          <div className="baby-love-admin-user-list-item-body">
            <div className="baby-love-admin-user-list-item-body-label">
              生日：
            </div>
            <div className="baby-love-admin-user-list-item-body-content">
              {userItem.userBirthday || "--"}
            </div>
          </div>
          <div className="baby-love-admin-user-list-item-body">
            <div className="baby-love-admin-user-list-item-body-label">
              住址：
            </div>
            <div className="baby-love-admin-user-list-item-body-content">
              {userItem.userAddress || "--"}
            </div>
          </div>
          <div className="baby-love-admin-user-list-item-body">
            <div className="baby-love-admin-user-list-item-body-label">
              结婚纪念日：
            </div>
            <div className="baby-love-admin-user-list-item-body-content">
              {userItem.userWeddingDate || "--"}
            </div>
          </div>
          <div className="baby-love-admin-user-list-item-body">
            <div className="baby-love-admin-user-list-item-body-label">
              用户喜好：
            </div>
            <div className="baby-love-admin-user-list-item-body-content">
              {userItem.userFavorite || "--"}
            </div>
          </div>
          <div className="baby-love-admin-user-list-item-body">
            <div className="baby-love-admin-user-list-item-body-label">
              用户其他：
            </div>
            <div className="baby-love-admin-user-list-item-body-content">
              {userItem.userOthers || "--"}
            </div>
          </div>
          <div className="baby-love-admin-user-list-item-body">
            <div className="baby-love-admin-user-list-item-body-label">
              是否是管理员：
            </div>
            <div className="baby-love-admin-user-list-item-body-content">
              {userItem.isAdmin}
            </div>
          </div>
        </div>
        <div
          className="baby-love-admin-user-list-item-footer"
          onClick={stopPropagation}
        >
          <div className="baby-love-admin-user-list-item-footer-created-time">
            {userItem.createdAt}
          </div>
          <div className="baby-love-admin-user-list-item-footer-actions">
            <Button color="primary" fill="none" onClick={this.updateUser}>
              修改
            </Button>
            {userItem.isAdmin === '是' ? null : (
              <Button color="primary" fill="none" onClick={this.removeUser}>
                删除
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default GoodsItem;

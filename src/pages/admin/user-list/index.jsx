import Moment from "moment";
import React from "react";
import { adminQueryAllUsers } from "../../../common/apis";
import request from "../../../common/http";
import { goTo } from "../../../common/utils";
import UserList from "./user-list";
import SearchBar from "./user-search";

import "./index.less";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      keyword: "",
      userBirthday: null,
      userWeddingDate: null,
      isShowLoading: false,
    };
  }

  componentDidMount() {
    this.initData();
  }

  /**
   * 初始化数据
   */
  initData = async () => {
    await this.getUserList();
  };

  /**
   * 获取用户列表
   */
  getUserList = async () => {
    this.setState({ isShowLoading: true });
    const { keyword, userBirthday, userWeddingDate } = this.state;
    const { data } = await request.post(adminQueryAllUsers, {
      keyword,
      userBirthday,
      userWeddingDate,
    });

    if (Array.isArray(data)) {
      this.setState({
        userList: data.map((userItem) => {
          if (userItem.userBirthday) {
            userItem.userBirthday = Moment(userItem.userBirthday).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          if (userItem.userWeddingDate) {
            userItem.userWeddingDate = Moment(userItem.userWeddingDate).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          userItem.createdAt = Moment(userItem.createdAt).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          userItem.isAdmin = userItem.isAdmin ? '是' : '否'
          return userItem;
        }),
        isShowLoading: false,
      });
      return;
    }
    this.setState({ isShowLoading: false });
  };

  /**
   * 搜索
   */
  onSearch = (keyword) => {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.setState({ keyword }, this.getUserList);
    }, 500);
  };

  /**
   * 跳转用户详情页
   * @param {string} userCode 用户编码
   */
  showUserDetails = (userCode) => {
    goTo("/user/details?userCode=" + userCode);
  };

  /**
   * 阻止事件冒泡
   * @param {event} e
   */
  stopPropagation = (e) => {
    e && e.stopPropagation();
  };

  render() {
    const { userList, isShowLoading } = this.state;

    return (
      <div className="baby-love-admin-user-list">
        <SearchBar onSearch={this.onSearch} />
        <UserList
          userList={userList}
          stopPropagation={this.stopPropagation}
          showUserDetails={this.showUserDetails}
          isShowLoading={isShowLoading}
          getUserList={this.getUserList}
        />
      </div>
    );
  }
}

export default Users;

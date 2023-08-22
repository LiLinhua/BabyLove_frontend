import DayJS from "dayjs";
import React from "react";
import { adminQueryAllUsers } from "../../../common/apis";
import request from "../../../common/http";
import { goTo } from "../../../common/utils";
import UserAdd from "./user-add";
import UserList from "./user-list";
import SearchBar from "./user-search";

import "./index.less";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      keyword: "",
      pageIndex: 1,
      pageSize: 1000,
      userBirthdaySort: null,
      userWeddingDateSort: null,
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
    const {
      keyword,
      userBirthdaySort,
      userWeddingDateSort,
      pageIndex,
      pageSize,
    } = this.state;
    let { data } = await request.post(adminQueryAllUsers, {
      keyword,
      userBirthdaySort,
      userWeddingDateSort,
      pageIndex,
      pageSize,
    });
    data = data?.list;

    if (Array.isArray(data)) {
      this.setState({
        userList: data.map((userItem) => {
          if (userItem.userBirthday) {
            userItem.userBirthday = DayJS(userItem.userBirthday).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          if (userItem.userWeddingDate) {
            userItem.userWeddingDate = DayJS(userItem.userWeddingDate).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          userItem.createdAt = DayJS(userItem.createdAt).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          userItem.isAdmin = userItem.isAdmin ? "是" : "否";
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
  onSearch = ({ keyword, userBirthdaySort, userWeddingDateSort }) => {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.setState(
        {
          keyword:
            typeof keyword === "undefined" ? this.state.keyword : keyword,
          userBirthdaySort:
            typeof userBirthdaySort === "undefined"
              ? this.state.userBirthdaySort
              : userBirthdaySort,
          userWeddingDateSort:
            typeof userWeddingDateSort === "undefined"
              ? this.state.userWeddingDateSort
              : userWeddingDateSort,
        },
        this.getUserList
      );
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

  /**
   * 新增用户
   */
  addUser = () => {
    goTo("/user/edit");
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
        {/* 新增商品图标 */}
        <UserAdd addUser={this.addUser} />
      </div>
    );
  }
}

export default Users;

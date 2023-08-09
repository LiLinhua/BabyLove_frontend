import { DotLoading } from "antd-mobile";
import React from "react";
import UserItem from "./user-item";

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const {
      userList,
      stopPropagation,
      isShowLoading,
      getUserList,
    } = this.props;

    if (isShowLoading) {
      return <DotLoading color="primary" />;
    }

    if (!userList?.length) {
      return <p className="baby-love-admin-user-list-empty">暂无数据</p>;
    }

    return (
      <ul className="baby-love-admin-user-list-content">
        {userList.map((userItem) => (
          <li
            key={userItem.userCode}
            className="baby-love-admin-user-list-item"
          >
            <UserItem
              userItem={userItem}
              stopPropagation={stopPropagation}
              getUserList={getUserList}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default UserList;

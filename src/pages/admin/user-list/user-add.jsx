import React from "react";
import { AddCircleOutline } from "antd-mobile-icons";
import { goTo } from "@/common/utils";

class UserAdd extends React.Component {
  constructor(props){
    super(props);
  }

  /**
   * 添加用户
   */
  addUser = () => {
    goTo('/user/edit');
  }

  render() {
    return (
      <div className="baby-love-admin-user-add" onClick={this.addUser}>
        <AddCircleOutline />
      </div>
    );
  }
}

export default UserAdd;

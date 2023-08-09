import { SearchBar } from "antd-mobile";
import React from "react";

class UserSearch extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="baby-love-admin-user-search">
        <SearchBar placeholder="请输入关键词" onChange={this.props.onSearch} />
      </div>
    );
  }
}

export default UserSearch;

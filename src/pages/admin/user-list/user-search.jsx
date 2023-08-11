import { Button, SearchBar } from "antd-mobile";
import React from "react";

class UserSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userBirthdaySort: false,
      userWeddingDateSort: false,
    };
  }

  /**
   * 设置关键词
   */
  setKeyword = (value) => {
    this.props.onSearch({
      keyword: value,
    });
  }

  /**
   * 设置生日选择器
   */
  setBirthdaySort = () => {
    const userBirthdaySort = !this.state.userBirthdaySort;
    this.setState({ userBirthdaySort, userWeddingDateSort: null });
    this.props.onSearch({
      userBirthdaySort,
      userWeddingDateSort: null,
    });
  };

  /**
   * 设置结婚纪念日选择器
   */
  setWeddingDateSort = (value) => {
    const userWeddingDateSort = !this.state.userWeddingDateSort;
    this.setState({ userWeddingDateSort, userBirthdaySort: null });
    this.props.onSearch({
      userBirthdaySort: null,
      userWeddingDateSort,
    });
  };

  render() {
    const { userBirthdaySort, userWeddingDateSort } = this.state;
    return (
      <div className="baby-love-admin-user-search">
        <SearchBar placeholder="请输入关键词" onChange={this.setKeyword} />
        <div className="baby-love-admin-user-search-sort">
          <Button
            className={`baby-love-admin-user-search-sort-item ${
              userBirthdaySort
                ? "baby-love-admin-user-search-sort-selected"
                : ""
            }`}
            color="primary"
            fill="none"
            onClick={this.setBirthdaySort}
          >
            近生日
          </Button>
          <Button
            className={`baby-love-admin-user-search-sort-item ${
              userWeddingDateSort
                ? "baby-love-admin-user-search-sort-selected"
                : ""
            }`}
            color="primary"
            fill="none"
            onClick={this.setWeddingDateSort}
          >
            近纪念日
          </Button>
        </div>
      </div>
    );
  }
}

export default UserSearch;

import { SearchBar } from "antd-mobile";
import React from "react";

class OrderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderKeyword: "",
      userKeyword: "",
      goodsKeyword: "",
    };
  }

  /**
   * 输入框值变动
   */
  onInputChange = (keyword, type) => {
    this.props.onSearch(keyword, type);

    switch (type) {
      case "order":
        this.setState({ orderKeyword: keyword, userKeyword: '', goodsKeyword: '' });
        break;
      case "user":
        this.setState({ userKeyword: keyword, goodsKeyword: '' });
        break;
      case "goods":
        this.setState({ goodsKeyword: keyword, userKeyword: '' });
        break;
    }
  };

  render() {
    const { orderKeyword, userKeyword, goodsKeyword } = this.state;
    return (
      <div className="baby-love-admin-order-search">
        <SearchBar
          value={orderKeyword}
          placeholder="订单号"
          onChange={(keyword) => this.onInputChange(keyword, "order")}
        />
        <SearchBar
          value={userKeyword}
          placeholder="姓名"
          onChange={(keyword) => this.onInputChange(keyword, "user")}
        />
        <SearchBar
          value={goodsKeyword}
          placeholder="商品名"
          onChange={(keyword) => this.onInputChange(keyword, "goods")}
        />
      </div>
    );
  }
}

export default OrderSearch;

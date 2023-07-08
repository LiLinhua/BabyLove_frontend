import { SearchBar } from "antd-mobile";
import React from "react";

class OrderSearch extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="baby-love-admin-order-search">
        <SearchBar placeholder='请输入订单号' onChange={this.props.onSearch}/>
      </div>
    );
  }
}

export default OrderSearch;

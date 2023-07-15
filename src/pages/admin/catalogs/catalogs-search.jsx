import { SearchBar } from "antd-mobile";
import React from "react";

class CatalogsSearch extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="baby-love-admin-catalog-search">
        <SearchBar placeholder="请输入关键词" onChange={this.props.onSearch} />
      </div>
    );
  }
}

export default CatalogsSearch;

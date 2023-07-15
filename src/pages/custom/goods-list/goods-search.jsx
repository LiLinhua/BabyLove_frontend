import { SearchBar, Tag } from "antd-mobile";
import React from "react";
import { adminQueryCatalogs } from "../../../common/apis";
import request from "../../../common/http";

class GoodsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogList: [],
      selectedCatalogs: [],
      searchKeyword: "",
    };
  }

  componentDidMount() {
    this.getCatalogList();
  }

  /**
   * 获取目录列表
   */
  getCatalogList = async () => {
    const { data } = await request.post(adminQueryCatalogs, {
      keyword: this.state.keyword,
    });

    if (Array.isArray(data)) {
      this.setState({
        catalogList: data,
      });
    }
  };

  /**
   * 选择商品目录
   */
  selectCatalog = (catalogCode) => {
    const { searchKeyword, selectedCatalogs } = this.state;
    const index = selectedCatalogs.indexOf(catalogCode);
    if (index > -1) {
      selectedCatalogs.splice(index, 1);
    } else {
      selectedCatalogs.push(catalogCode);
    }
    this.setState({ selectedCatalogs: [...selectedCatalogs] }, () => {
      this.props.onSearch(searchKeyword, selectedCatalogs.join(','));
    });
  };

  /**
   * 修改搜索框值
   */
  changeSearchInputValue = (value) => {
    this.setState({ searchKeyword: value }, () => {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.props.onSearch(value, this.state.selectedCatalogs.join(','));
      }, 500);
    });
  };

  render() {
    return (
      <div className="baby-love-custom-goods-search">
        <div>
          {this.state.catalogList.length > 1 &&
            this.state.catalogList.map((catalog) => (
              <Tag
                className={
                  this.state.selectedCatalogs.indexOf(catalog.catalogCode) > -1
                    ? "baby-love-custom-goods-search-selected"
                    : ""
                }
                onClick={() => this.selectCatalog(catalog.catalogCode)}
              >
                {catalog.catalogName}
              </Tag>
            ))}
        </div>
        <SearchBar
          placeholder="请输入关键词"
          onChange={this.changeSearchInputValue}
        />
      </div>
    );
  }
}

export default GoodsSearch;

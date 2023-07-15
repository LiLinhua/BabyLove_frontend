import React from "react";
import { adminQueryCatalogs } from "../../../common/apis";
import request from "../../../common/http";
import CatalogAdd from "./catalogs-add";
import CatalogList from "./catalogs-list";
import SearchBar from "./catalogs-search";

import "./index.less";

class Catalogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogList: [],
      keyword: "",
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
    await this.getCatalogList();
  };

  /**
   * 获取目录列表
   */
  getCatalogList = async () => {
    this.setState({ isShowLoading: true });
    const { data } = await request.post(adminQueryCatalogs, {
      keyword: this.state.keyword,
    });

    if (Array.isArray(data)) {
      this.setState({
        catalogList: data,
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
      this.setState({ keyword }, this.getCatalogList);
    }, 500);
  };

  /**
   * 阻止事件冒泡
   * @param {event} e
   */
  stopPropagation = (e) => {
    e && e.stopPropagation();
  };

  render() {
    const { catalogList, isShowLoading } = this.state;

    return (
      <div className="baby-love-admin-catalog-list">
        <SearchBar onSearch={this.onSearch} />
        <CatalogList
          catalogList={catalogList}
          stopPropagation={this.stopPropagation}
          isShowLoading={isShowLoading}
          getCatalogList={this.getCatalogList}
        />
        <CatalogAdd getCatalogList={this.getCatalogList} />
      </div>
    );
  }
}

export default Catalogs;

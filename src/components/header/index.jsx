import { goTo, isAdmin } from "@/common/utils";
import { AppstoreOutline, LeftOutline } from "antd-mobile-icons";
import React from "react";
import { history } from "umi";

import "./index.less";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  back = () => {
    history.back();
  };
  toHome = () => {
    goTo("/");
  };
  render() {
    return (
      <header className="baby-love-header">
        {/* <span className="baby-love-header-search-icon">
                    <Icon type="search"/>
                </span> */}
        <span className="baby-love-header-back" onClick={this.back}>
          <LeftOutline />
        </span>
        <span className="baby-love-header-title" onClick={this.toHome}>
          Baby Love
        </span>
        {isAdmin && (
          <span className="baby-love-header-home" onClick={this.toHome}>
            <AppstoreOutline />
          </span>
        )}
      </header>
    );
  }
}

export default Header;

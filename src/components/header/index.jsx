import { LeftOutline } from "antd-mobile-icons";
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
  render() {
    return (
      <header className="baby-love-header">
        {/* <span className="baby-love-header-search-icon">
                    <Icon type="search"/>
                </span> */}
        <span className="baby-love-header-back" onClick={this.back}>
          <LeftOutline />
        </span>
        <span className="baby-love-header-title"> Baby Love </span>
      </header>
    );
  }
}

export default Header;

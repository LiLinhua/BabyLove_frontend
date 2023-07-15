import { getAdminHomeNavConfig } from "@/common/config";
import { getShoppingCartCode } from "@/common/utils";
import React from "react";

import "./index.less";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
    };
    this.setMenus();
  }

  /**
   * 设置菜单
   */
  setMenus = async () => {
    this.setState({
      menus: getAdminHomeNavConfig(await getShoppingCartCode()),
    });
  };

  render() {
    return (
      <div className="baby-love-admin-home">
        <div className="baby-love-admin-home-body">
          {this.state.menus.map((menu) => (
            <div
              className={`baby-love-admin-home-item ${menu.className || ""}`}
              onClick={menu.onClick}
            >
              {menu.title}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Index;

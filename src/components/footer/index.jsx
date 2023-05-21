import React from "react";
import { getNavConfig } from "../../common/utils";
import "./index.less";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const navConfig = getNavConfig();
    return (
      <footer className="baby-love-footer">
        {navConfig.map((item) => {
          return (
            <div className="baby-love-footer-item" onClick={item.onClick}>
              {item.title}
            </div>
          );
        })}
      </footer>
    );
  }
}

export default Footer;

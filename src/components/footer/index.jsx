import React from "react";
import { getNavConfig } from "../../common/utils";
import "./index.less";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navConfig: [],
    };
  }

  componentDidMount() {
    this.getConfig();
  }

  /**
   * 获取配置
   */
  getConfig = async () => {
    const navConfig = await getNavConfig();
    this.setState({ navConfig });
  };

  /**
   * 渲染函数
   * @returns
   */
  render() {
    return (
      <footer className="baby-love-footer">
        {this.state.navConfig.map((item) => {
          return (
            <div key={item.title} className="baby-love-footer-item" onClick={item.onClick}>
              {item.title}
            </div>
          );
        })}
      </footer>
    );
  }
}

export default Footer;

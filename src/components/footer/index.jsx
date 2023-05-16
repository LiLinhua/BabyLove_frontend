import React from "react";
import "./index.less";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data = [] } = this.props;
    return (
      <footer className="baby-love-footer">
        {data.map((item) => {
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

import React from "react";
import { AddCircleOutline } from "antd-mobile-icons";

class GoodsAdd extends React.Component {
  render() {
    const { addGoods } = this.props;
    return (
      <div className="baby-love-admin-goods-add" onClick={addGoods}>
        <AddCircleOutline />
      </div>
    );
  }
}

export default GoodsAdd;

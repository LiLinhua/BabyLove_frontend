import React from "react";

class GoodsBaseInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { goodsTitle, goodsSubtitle, goodsPrice } = this.props;
    return (
      <div className="baby-love-admin-goods-details-base-info">
        <p className="baby-love-admin-goods-details-price">¥{goodsPrice}</p>
        <p className="baby-love-admin-goods-details-title">{goodsTitle}</p>
        <p className="baby-love-admin-goods-details-subtitle">{goodsSubtitle}</p>
      </div>
    );
  }
}

export default GoodsBaseInfo;

import React from "react";

class GoodsBaseInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { goodsTitle, goodsSubtitle, goodsPrice } = this.props;
    return (
      <div className="baby-love-goods-details-base-info">
        <p className="baby-love-goods-details-price">¥{goodsPrice}</p>
        <p className="baby-love-goods-details-title">{goodsTitle}</p>
        <p className="baby-love-goods-details-subtitle">{goodsSubtitle}</p>
      </div>
    );
  }
}

export default GoodsBaseInfo;

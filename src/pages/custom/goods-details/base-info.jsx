import React from "react";

class GoodsBaseInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { goodsTitle, goodsSubtitle, goodsPrice, goodsDetails } = this.props;
    return (
      <>
        <div className="baby-love-custom-goods-details-base-info">
          <p className="baby-love-custom-goods-details-price">
            ¥{goodsPrice || "--"}
          </p>
          <p className="baby-love-custom-goods-details-title">
            {goodsTitle || "--"}
          </p>
          <p className="baby-love-custom-goods-details-subtitle">
            {goodsSubtitle}
          </p>
        </div>
        <div
          className="baby-love-custom-goods-details-details"
          dangerouslySetInnerHTML={{ __html: goodsDetails }}
        ></div>
      </>
    );
  }
}

export default GoodsBaseInfo;

import React from "react";

class GoodsBaseInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { goodsTitle, goodsSubtitle, goodsPrice, goodsOriginPrice, goodsDetails } =
      this.props;
    return (
      <>
        <div className="baby-love-admin-goods-details-base-info">
          <p className="baby-love-admin-goods-details-price">
            ¥{goodsPrice || "--"}
            <span className="baby-love-admin-goods-details-origin-price">
              {goodsOriginPrice ? `¥${goodsOriginPrice}` : ""}
            </span>
          </p>

          <p className="baby-love-admin-goods-details-title">
            {goodsTitle || "--"}
          </p>
          <p className="baby-love-admin-goods-details-subtitle">
            {goodsSubtitle}
          </p>
        </div>
        <div
          className="baby-love-admin-goods-details-details"
          dangerouslySetInnerHTML={{ __html: goodsDetails }}
        ></div>
      </>
    );
  }
}

export default GoodsBaseInfo;

import NoPictureIcon from "@/assets/no-picture.png";
import { Swiper } from "antd-mobile";
import React from "react";

class GoodsSwiper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pictures, goodsInventory } = this.props;
    return (
      <div className="baby-love-admin-goods-details-swiper">
        {pictures?.length ? (
          <Swiper autoplay loop>
            {(pictures || []).map((picture) => (
              <Swiper.Item key={picture.pictureCode}>
                <div className="baby-love-admin-goods-details-swiper-item">
                  <img src={picture.pictureUrl} />
                </div>
              </Swiper.Item>
            ))}
          </Swiper>
        ) : (
          <img src={NoPictureIcon} />
        )}
        <span className="baby-love-admin-goods-details-inventory">
          {goodsInventory < 0 ? "已售罄" : `仅剩${goodsInventory}件`}
        </span>
      </div>
    );
  }
}

export default GoodsSwiper;

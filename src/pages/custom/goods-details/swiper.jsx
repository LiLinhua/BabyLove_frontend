import NoPictureIcon from "@/assets/no-picture.png";
import { Swiper } from "antd-mobile";
import { goodsStatus as goodsStatusEnums } from "@/common/constant";
import React from "react";

class GoodsSwiper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pictures, goodsInventory, goodsStatus } = this.props;
    return (
      <div className="baby-love-custom-goods-details-swiper">
        {pictures?.length ? (
          <Swiper autoplay loop>
            {(pictures || []).map((picture) => (
              <Swiper.Item key={picture.pictureCode}>
                <div className="baby-love-custom-goods-details-swiper-item">
                  <img src={picture.pictureUrl} />
                </div>
              </Swiper.Item>
            ))}
          </Swiper>
        ) : (
          <img src={NoPictureIcon} />
        )}
        <span className="baby-love-custom-goods-details-inventory">
          {goodsInventory < 1 ? "已售罄" : `仅剩${goodsInventory}件`}
        </span>
        {goodsStatus === goodsStatusEnums.OFFLINE.value && <span className="baby-love-custom-goods-details-offline">已下架</span>}
      </div>
    );
  }
}

export default GoodsSwiper;

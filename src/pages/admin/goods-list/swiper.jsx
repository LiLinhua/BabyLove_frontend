import NoPictureIcon from "@/assets/no-picture.png";
import { Swiper } from "antd-mobile";
import React from "react";

class GoodsSwiper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pictures } = this.props;
    return (
      <div className="baby-love-admin-goods-swiper">
        {pictures?.length ? (
          <Swiper autoplay loop style={{ '--height': '240px' }}>
            {(pictures || []).map((picture) => (
              <Swiper.Item key={picture.pictureCode || picture.pictureUrl}>
                <div className="baby-love-admin-goods-swiper-item">
                  <a href={picture.link}>
                    <img src={picture.pictureUrl} />
                  </a>
                </div>
              </Swiper.Item>
            ))}
          </Swiper>
        ) : (
          <img src={NoPictureIcon} />
        )}
      </div>
    );
  }
}

export default GoodsSwiper;

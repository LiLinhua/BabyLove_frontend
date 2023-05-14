import React from "react";
import { Swiper } from "antd-mobile";

class GoodsSwiper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pictures } = this.props;
    return (
      <Swiper autoplay loop>
        {(pictures || []).map((picture) => (
          <Swiper.Item key={picture.pictureCode}>
            <div className="baby-love-goods-details-swiper">
              <img src={picture.pictureUrl} />
            </div>
          </Swiper.Item>
        ))}
      </Swiper>
    );
  }
}

export default GoodsSwiper;

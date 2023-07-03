import NoPictureIcon from "@/assets/no-picture.png";
import { Button, Ellipsis } from "antd-mobile";
import React from "react";

class GoodsItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      goodsItem,
      selectGoodsCodes,
      selectGoods,
      changeCount,
      stopPropagation,
    } = this.props;
    return (
      <div>
        <div className="baby-love-admin-order-list-item-header">
          <span className="baby-love-admin-order-list-item-header-left">
            <span className="baby-love-admin-order-list-item-number">
              123456789011
            </span>
            <span className="baby-love-admin-order-list-item-time">
              2023-01-01 12:00:00
            </span>
          </span>
          <span className="baby-love-admin-order-list-item-status">已完成</span>
        </div>
        <div className="baby-love-admin-order-list-goods-picture">
          <ul>
            {goodsItem.pictures &&
              goodsItem.pictures.map((picture) => {
                return (
                  <li key={picture.pictureCode}>
                    <div
                      className="baby-love-admin-order-list-goods-picture-content"
                      style={{
                        backgroundImage: `url(${
                          picture.pictureUrl || NoPictureIcon
                        })`,
                      }}
                    ></div>
                    {/* <Image
                      src={picture.pictureUrl || NoPictureIcon}
                      width="100%"
                      height="100%"
                      fit="contain"
                      style={{ borderRadius: 4 }}
                    /> */}
                    <Ellipsis
                      direction="end"
                      rows={1}
                      content={goodsItem.goodsTitle}
                    />
                    <span className="baby-love-admin-order-list-goods-count">
                      X2
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="baby-love-admin-order-list-item-footer">
          <div className="baby-love-admin-order-list-item-price">
            <span className="baby-love-admin-order-list-item-price-label">
              实付：
            </span>
            ¥1000
          </div>
          <div className="baby-love-admin-order-list-item-actions">
            <Button color="primary" fill="none">
              复制单号
            </Button>
            <Button color="primary" fill="none">
              查看物流
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default GoodsItem;

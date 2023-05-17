import React from "react";
import { Button } from "antd-mobile";
import { history } from "umi";
import GoodsSwiper from "./swiper";
import GoodsBaseInfo from "./base-info";
import ShoppingCartIcon from "@/assets/shopping-cart.png";

import "./index.less";

class Goods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsDetails: {
        goodsCode: "aaaaa",
        goodsTitle: "标题标题标题标题标题标题标题",
        goodsSubtitle: "副标题副标题副标题副标题副标题副标题副标题副标题",
        goodsPrice: 12.34,
        goodsDetails:
          "详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情详情",
        pictures: [
          {
            pictureCode: "aaa",
            pictureUrl:
              "https://img2.baidu.com/it/u=4172024400,264653010&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1684170000&t=51b1ae459408ddbdfdedcc6a53565762",
          },
          {
            pictureCode: "bbb",
            pictureUrl:
              "https://img1.baidu.com/it/u=2278717026,2923133725&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1684256400&t=d9556dc8d2311ebeeb8709160167368d",
          },
          {
            pictureCode: "ccc",
            pictureUrl:
              "https://img1.baidu.com/it/u=2236572226,1780107877&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1684256400&t=b43c3443205d2f621f52957020762e01",
          },
        ],
      },
    };
  }
  componentDidMount() {}
  handleGoToCart = () => {
    history.push("/view/shopping-cart");
  };
  render() {
    const { goodsTitle, goodsSubtitle, goodsPrice, goodsDetails, pictures } =
      this.state.goodsDetails || {};
    return (
      <div className="baby-love-goods">
        {/* 商品列表 */}
        <div className="baby-love-goods-details">
          {/* 轮播图 */}
          <GoodsSwiper pictures={pictures} />
          {/* 商品信息 */}
          <GoodsBaseInfo
            goodsTitle={goodsTitle}
            goodsSubtitle={goodsSubtitle}
            goodsPrice={goodsPrice}
          />
          {/* 商品详情 */}
          <div
            className="baby-love-goods-details-details"
            dangerouslySetInnerHTML={{ __html: goodsDetails }}
          ></div>
          {/* 加入购物车 */}
          <div className="baby-love-goods-details-add-to-cart">
            <Button color="primary">加入购物车</Button>
          </div>
          {/* 购物车图标 */}
          <div
            className="baby-love-goods-to-cart"
            onClick={this.handleGoToCart}
          >
            <span>12</span>
            <img src={ShoppingCartIcon} />
          </div>
        </div>
      </div>
    );
  }
}

export default Goods;

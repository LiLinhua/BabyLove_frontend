import React from "react";
import { history } from 'umi';
import GoodsItem from "./goods-item";
import ShoppingCartIcon from "@/assets/shopping-cart.png";

import "./index.less";

class GoodsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [
        {
          goodsCode: "aaaaa",
          goodsTitle: "标题标题标题标题标题标题标题",
          goodsSubtitle: "副标题副标题副标题副标题副标题副标题副标题副标题",
          goodsPrice: 12.34,
          goodsDetails: "详情详情详情详情详情详情详情详情详情详情详情详情详情",
          pictures: [
            {
              pictureCode: "aaa",
              pictureUrl:
                "https://img2.baidu.com/it/u=4172024400,264653010&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1684170000&t=51b1ae459408ddbdfdedcc6a53565762",
            },
          ],
        },
        {
          goodsCode: "bb",
          goodsTitle: "标题标题标题标题标题标题标题",
          goodsSubtitle: "副标题副标题副标题副标题副标题副标题副标题副标题",
          goodsPrice: 12.34,
          goodsDetails: "详情详情详情详情详情详情详情详情详情详情详情详情详情",
          pictures: [
            {
              pictureCode: "bb",
              pictureUrl:
                "https://media.dior.cn/couture/ecommerce/media/catalog/product/a/M/1681901709_S5169UDAX_M900_E01_GH.jpg?imwidth=460",
            },
          ],
        },
        {
          goodsCode: "cc",
          goodsTitle: "标题标题标题标题标题标题标题",
          goodsSubtitle: "副标题副标题副标题副标题副标题副标题副标题副标题",
          goodsPrice: 12.34,
          goodsDetails: "详情详情详情详情详情详情详情详情详情详情详情详情详情",
          pictures: [
            {
              pictureCode: "cc",
              pictureUrl:
                "https://img0.baidu.com/it/u=450558320,2864057328&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1684170000&t=da25f66a1e5fe91b18013e7babd6770d",
            },
          ],
        },
        {
          goodsCode: "dd",
          goodsTitle: "标题标题标题标题标题标题标题",
          goodsSubtitle: "副标题副标题副标题副标题副标题副标题副标题副标题",
          goodsPrice: 12.34,
          goodsDetails: "详情详情详情详情详情详情详情详情详情详情详情详情详情",
          pictures: [
            {
              pictureCode: "dd",
              pictureUrl:
                "https://media.dior.cn/couture/ecommerce/media/catalog/product/a/M/1681901709_S5169UDAX_M900_E01_GH.jpg?imwidth=460",
            },
          ],
        },
      ],
    };
  }
  componentDidMount() {}
  handleGoToCart = () => {
    history.push("/shopping-cart");
  };
  render() {
    const { goodsList } = this.state;
    return (
      <div className="baby-love-goods">
        {/* 商品列表 */}
        <div className="baby-love-goods-list">
          {goodsList.map((goods) => (
            <GoodsItem key={goods.goodsCode} {...goods} />
          ))}
        </div>
        {/* 购物车图标 */}
        <div className="baby-love-goods-to-cart" onClick={this.handleGoToCart}>
            <span>12</span>
            <img src={ShoppingCartIcon} />
        </div>
      </div>
    );
  }
}

export default GoodsList;

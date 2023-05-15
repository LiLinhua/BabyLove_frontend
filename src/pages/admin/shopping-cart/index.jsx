import { Image, Input } from "antd-mobile";
import { AddCircleOutline, MinusCircleOutline } from "antd-mobile-icons";
import React from "react";
import { history } from "umi";

import "./index.less";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [
        {
          goodsCode: "aaaaa",
          goodsTitle:
            "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
          goodsSubtitle: "副标题副标题副标题副标题副标题副标题副标题副标题",
          goodsPrice: 12.34,
          goodsCount: 12,
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
          goodsCount: 1,
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
          goodsCount: 2,
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
          goodsCount: 122,
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

  /**
   * 修改数量
   * @param {Event} e
   * @param {Object} record
   */
  changeCount = (e, record, count) => {
    const { goodsList } = this.state;
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].goodsCode === record.goodsCode) {
        goodsList[i].goodsCount = count;
        this.setState({ goodsList: [...goodsList] });
        break;
      }
    }
    e && e.stopPropagation();
    return false;
  };
  /**
   * 跳转商品详情页
   * @param {string} goodsCode
   */
  toGoodsDetails = (goodsCode) => {
    history.push("/goods/details?goodsCode=" + goodsCode);
  };
  render() {
    return (
      <div className="baby-love-admin-shopping-cart">
        <ul>
          {this.state.goodsList.map((goodsItem) => (
            <li
              key={goodsItem.goodsCode}
              onClick={() => this.toGoodsDetails(goodsItem.goodsCode)}
            >
              <div className="baby-love-admin-shopping-cart-goods-picture">
                <Image
                  src={goodsItem.pictures?.[0]?.pictureUrl}
                  width="100%"
                  height="100%"
                  fit="contain"
                  style={{ borderRadius: 4 }}
                />
              </div>
              <div className="baby-love-admin-shopping-cart-goods-buy-info">
                <p className="baby-love-admin-shopping-cart-goods-title">
                  {goodsItem.goodsTitle}
                </p>
                {/* <p className="baby-love-admin-shopping-cart-goods-subtitle">
                  {goodsItem.goodsSubtitle}
                </p> */}
                <div className="baby-love-admin-shopping-cart-goods-price-count">
                  <span className="baby-love-admin-shopping-cart-goods-price">
                    ¥{goodsItem.goodsPrice}
                  </span>
                  <span className="baby-love-admin-shopping-cart-goods-count">
                    <span
                      onClick={(e) =>
                        this.changeCount(e, goodsItem, --goodsItem.goodsCount)
                      }
                    >
                      <MinusCircleOutline />
                    </span>
                    <Input
                      value={goodsItem.goodsCount}
                      type="number"
                      min={1}
                      max={999}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(value) =>
                        this.changeCount(null, goodsItem, value)
                      }
                    />
                    <AddCircleOutline
                      onClick={(e) =>
                        this.changeCount(e, goodsItem, ++goodsItem.goodsCount)
                      }
                    />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ShoppingCart;

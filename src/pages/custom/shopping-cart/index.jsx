import { Dialog, Toast } from "antd-mobile";
import React from "react";
import { history } from "umi";
import GoodsItem from "./goods-item";
import OrderInfo from "./order-info";

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
        {
          goodsCode: "dee",
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
        {
          goodsCode: "ff",
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
        {
          goodsCode: "gg",
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
      selectGoodsCodes: [],
      totalPrice: 0,
    };
  }
  componentDidMount() {}

  /**
   * 阻止事件冒泡
   */
  stopPropagation = (e) => {
    e && e.stopPropagation();
    return false;
  };

  /**
   * 修改数量
   * @param {Event} e
   * @param {Object} record
   */
  changeCount = (e, record, count) => {
    const { goodsList } = this.state;
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].goodsCode === record.goodsCode) {
        goodsList[i].goodsCount = count < 1 ? 1 : count;
        this.setState({ goodsList: [...goodsList] });
        break;
      }
    }
    // 计算订单总价
    this.setTotalPrice();
    // 阻止事件冒泡
    this.stopPropagation(e);
    return false;
  };

  /**
   * 跳转商品详情页
   * @param {string} goodsCode
   */
  toGoodsDetails = (goodsCode) => {
    history.push("/goods/details?goodsCode=" + goodsCode);
  };

  /**
   * 设置订单总价
   */
  setTotalPrice = () => {
    const { selectGoodsCodes, goodsList } = this.state;
    let totalPrice = 0;
    goodsList.forEach((goodsItem) => {
      if (selectGoodsCodes.includes(goodsItem.goodsCode)) {
        totalPrice += goodsItem.goodsPrice * goodsItem.goodsCount;
      }
    });

    this.setState({ totalPrice });
  };

  /**
   * 选择商品
   * @param {string} goodsCode
   */
  selectGoods = (goodsCode, isSelect) => {
    let { selectGoodsCodes } = this.state;

    const index = selectGoodsCodes.indexOf(goodsCode);
    if (isSelect && index === -1) {
      selectGoodsCodes.push(goodsCode);
      this.setState(
        { selectGoodsCodes: [...selectGoodsCodes] },
        this.setTotalPrice
      );
    } else if (!isSelect && index > -1) {
      selectGoodsCodes.splice(index, 1);
      this.setState(
        { selectGoodsCodes: [...selectGoodsCodes] },
        this.setTotalPrice
      );
    }
  };

  /**
   * 选择全部
   */
  selectAllGoods = (isSelectAll) => {
    this.setState(
      {
        selectGoodsCodes: isSelectAll
          ? this.state.goodsList.map((goodsItem) => goodsItem.goodsCode)
          : [],
      },
      this.setTotalPrice
    );
  };

  /**
   * 删除
   */
  remove = async () => {
    let { selectGoodsCodes, goodsList } = this.state;

    if (!selectGoodsCodes.length) {
      return Toast.show({ content: "请先选择商品" });
    }

    const result = await Dialog.confirm({
      content: "确定删除所选商品吗？",
    });
    if (!result) {
      return;
    }

    goodsList = goodsList.filter(
      (goodsItem) => !selectGoodsCodes.includes(goodsItem.goodsCode)
    );

    this.setState({ goodsList });
  };

  /**
   * 下单
   */
  buy = () => {};

  render() {
    const { totalPrice, goodsList, selectGoodsCodes } = this.state;
    return (
      <div className="baby-love-shopping-cart">
        <ul>
          {goodsList.map((goodsItem) => (
            <li
              key={goodsItem.goodsCode}
              onClick={() => this.toGoodsDetails(goodsItem.goodsCode)}
            >
              <GoodsItem
                goodsItem={goodsItem}
                selectGoodsCodes={selectGoodsCodes}
                selectGoods={this.selectGoods}
                changeCount={this.changeCount}
                stopPropagation={this.stopPropagation}
              />
            </li>
          ))}
        </ul>
        <OrderInfo
          totalPrice={totalPrice}
          goodsList={goodsList}
          selectGoodsCodes={selectGoodsCodes}
          selectAllGoods={this.selectAllGoods}
          remove={this.remove}
          buy={this.buy}
        />
      </div>
    );
  }
}

export default ShoppingCart;

import { Dialog, Toast } from "antd-mobile";
import React from "react";
import {
  adminQueryAllShoppingCarts,
  adminQueryShoppingCartAllGoods,
  adminShoppingCartBatchRemoveGoods,
  adminShoppingCartBatchUpdateSelected,
  adminShoppingCartUpdateBuyCount,
} from "../../../common/apis";
import request from "../../../common/http";
import {
  copy,
  getShoppingCartCode,
  goTo,
  setShoppingCartCode,
  setAdminShoppingCartCode,
  removeAdminShoppingCartCode,
  getAdminShoppingCartCode,
} from "../../../common/utils";
import GoodsList from "./goods-list";
import OrderInfo from "./order-info";
import ShoppingCartChangeActions from "./shopping-cart-change-actions";
import ShoppingCartSelectModal from "./shopping-cart-select-modal";

import "./index.less";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allShoppingCartList: [],
      shoppingCartList: [],
      goodsList: [],
      selectGoodsCodes: [],
      totalPrice: 0,
      isShowSelectShoppingCartModal: false,
      isShowModalLoading: true,
    };
  }

  componentDidMount() {
    this.initData();
  }

  /**
   * 初始化数据
   */
  initData = async () => {
    await this.setShoppingCartCodeToThis();
    await this.getGoodsList(this.shoppingCartCode);
  };

  /**
   * 挂载购物车编码到 this
   */
  setShoppingCartCodeToThis = async () => {
    const searchParams = new URLSearchParams(location.search);

    this.shoppingCartCode =
      searchParams.get("shoppingCartCode") || (await getShoppingCartCode());
  };

  /**
   * 阻止事件冒泡
   */
  stopPropagation = (e) => {
    e && e.stopPropagation();
    return false;
  };

  /**
   * 查询购物车列表
   */
  getShoppingCartList = async () => {
    const { data } = await request.get(adminQueryAllShoppingCarts);

    if (Array.isArray(data)) {
      this.setState({ shoppingCartList: data, allShoppingCartList: [...data] });
    }

    this.setState({ isShowModalLoading: false });
  };

  /**
   * 重置当前的购物车
   */
  resetShoppingCart = () => {
    const adminShoppingCartCode = getAdminShoppingCartCode();
    if (adminShoppingCartCode) {
      setShoppingCartCode(adminShoppingCartCode);
      removeAdminShoppingCartCode();
      Toast.show({
        content: "重置成功，跳转中...",
        icon: "success",
      });
      setTimeout(() => {
        goTo(`/shopping-cart?shoppingCartCode=${adminShoppingCartCode}`, true);
      }, 1000)
      return;
    }
    Toast.show({
      content: "本地无管理端购物车信息",
      icon: "fail",
    });
  };

  /**
   * 显示选择购物车弹窗
   * @param {boolean} isShow 是否显示选择购物车弹窗
   */
  showSelectShoppingCartModal = (isShow) => {
    this.setState({
      isShowSelectShoppingCartModal: isShow,
    });
  };

  /**
   * 选择购物车
   * @param {Object} shoppingCart 购物车信息
   */
  selectShoppingCart = async (shoppingCart) => {
    if(!getAdminShoppingCartCode()){
      setAdminShoppingCartCode(await getShoppingCartCode());
    }
    setShoppingCartCode(shoppingCart.shoppingCartCode);

    goTo(`/shopping-cart?shoppingCartCode=${shoppingCart.shoppingCartCode}`, true);

    // this.setState({ isShowSelectShoppingCartModal: false }, () => {
    //   const goodsList = this.getGoodsListFromShoppingCartInfo(shoppingCart);
    //   this.setGoodsListToState(goodsList);
    // });
  };

  /**
   * 更新商品列表数据
   * @param {array} goodsList 商品数据
   */
  setGoodsListToState = (goodsList) => {
    if (!Array.isArray(goodsList)) {
      return;
    }
    const selectGoodsCodes = [];
    goodsList.forEach((good) => {
      if (good.selected) {
        selectGoodsCodes.push(good.goodsCode);
      }
    });

    this.setState(
      {
        goodsList: goodsList || [],
        selectGoodsCodes,
      },
      this.setTotalPrice
    );
  };

  /**
   * 获取商品列表
   * @param {string} shoppingCartCode 购物车编码
   */
  getGoodsList = async (shoppingCartCode) => {
    if (!shoppingCartCode) {
      return;
    }

    const { data } = await request.get(adminQueryShoppingCartAllGoods, {
      params: { shoppingCartCode },
    });

    this.setGoodsListToState(data?.goods);
  };

  /**
   * 从购物车信息中获取商品列表
   * @param {string} shoppingCart 购物车信息
   */
  getGoodsListFromShoppingCartInfo = (shoppingCart) => {
    return shoppingCart?.goods || [];
  };

  /**
   * 修改数量
   * @param {Event} e
   * @param {Object} record 修改的商品
   * @param {number} count 修改的数量
   */
  changeCount = async (e, record, count) => {
    // 阻止事件冒泡
    this.stopPropagation(e);

    // 数量修正
    count = count < 1 ? 1 : count;

    // 修改后台购物车商品数量
    const { success, data, errCode } = await request.post(
      adminShoppingCartUpdateBuyCount,
      {
        shoppingCartCode: await getShoppingCartCode(),
        goodsCode: record.goodsCode,
        buyCount: count,
      }
    );
    if (!success) {
      return;
    }

    if (errCode === "OUT_OF_STOCK") {
      // 库存不足
      Toast.show({
        content: "该商品库存不足",
      });
      count = data;
    }

    // 修改前端数量
    const { goodsList } = this.state;
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].goodsCode === record.goodsCode) {
        goodsList[i].buyCount = count < 1 ? 1 : count;
        this.setState({ goodsList: [...goodsList] });
        break;
      }
    }

    // 计算订单总价
    this.setTotalPrice();
  };

  /**
   * 跳转商品详情页
   * @param {string} goodsCode 商品编码
   */
  toGoodsDetails = (goodsCode) => {
    goTo("/goods/details?goodsCode=" + goodsCode);
  };

  /**
   * 设置订单总价
   */
  setTotalPrice = () => {
    const { selectGoodsCodes, goodsList } = this.state;
    let totalPrice = 0;
    goodsList.forEach((goodsItem) => {
      if (selectGoodsCodes.includes(goodsItem.goodsCode)) {
        totalPrice += goodsItem.goodsPrice * goodsItem.buyCount;
      }
    });

    this.setState({ totalPrice });
  };

  /**
   * 显示选择购物车弹窗
   */
  showSelectShoppingCartModal = () => {
    this.setState({ isShowSelectShoppingCartModal: true });
    this.getShoppingCartList();
  };

  /**
   * 关闭选择购物车弹窗
   */
  closeSelectShoppingCartModal = () => {
    this.setState({ isShowSelectShoppingCartModal: false });
  };

  /**
   * 搜索购物车
   */
  searchShoppingCart = (keyword) => {
    const { allShoppingCartList } = this.state;
    return this.setState({
      shoppingCartList: !keyword
        ? [...allShoppingCartList]
        : allShoppingCartList.filter(
            (shoppingCart) =>
              shoppingCart.shoppingCartCode.indexOf(keyword) > -1
          ),
    });
  };

  /**
   * 选择商品
   * @param {string} goodsCode 商品编码
   * @param {boolean} isSelect 是否选择商品
   */
  selectGoods = async (goodsCode, isSelect) => {
    let { selectGoodsCodes } = this.state;

    const { success } = await request.post(
      adminShoppingCartBatchUpdateSelected,
      {
        shoppingCartCode: await getShoppingCartCode(),
        goodsCodes: [goodsCode],
        selected: isSelect ? 1 : 0,
      }
    );
    if (!success) {
      return;
    }

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
   * @param {string} isSelectAll 是否选择全部
   */
  selectAllGoods = async (isSelectAll) => {
    const selectGoodsCodes = isSelectAll
      ? this.state.goodsList.map((goodsItem) => goodsItem.goodsCode)
      : [];
    const { success } = await request.post(
      adminShoppingCartBatchUpdateSelected,
      {
        shoppingCartCode: await getShoppingCartCode(),
        goodsCodes: selectGoodsCodes,
        selected: isSelectAll ? 1 : 0,
      }
    );
    if (!success) {
      return;
    }

    this.setState(
      {
        selectGoodsCodes,
      },
      this.setTotalPrice
    );
  };

  /**
   * 删除商品
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
    const { success } = await request.post(adminShoppingCartBatchRemoveGoods, {
      shoppingCartCode: await getShoppingCartCode(),
      goodsCodes: selectGoodsCodes,
    });
    if (!success) {
      return;
    }

    Toast.show({
      icon: "success",
      content: "删除成功！",
    });

    goodsList = goodsList.filter(
      (goodsItem) => !selectGoodsCodes.includes(goodsItem.goodsCode)
    );

    this.setState({ goodsList, selectGoodsCodes: [] });
  };

  /**
   * 下单
   */
  buy = () => {
    let { selectGoodsCodes } = this.state;

    if (!selectGoodsCodes.length) {
      return Toast.show({ content: "请先选择商品" });
    }

    Dialog.confirm({
      image: "/public/pictures/WX20230519-011105.png",
      title: "专属客服下单",
      content: (
        <>
          <p>1、长按保存图片添加专属客服微信；</p>
          <p>2、复制购物车地址发给专属客服下单。</p>
          <p>购物车地址：{location.href}</p>
        </>
      ),
      confirmText: "复制地址",
      onConfirm: () => {
        const copyResult = copy(location.href);
        if (copyResult) {
          setTimeout(() => {
            Toast.show({ content: "复制成功", icon: "success" });
          }, 300);
        } else {
          Toast.show({ content: "复制失败，请手动复制", icon: "fail" });
        }
      },
    });
  };

  render() {
    const {
      totalPrice,
      shoppingCartList,
      selectGoodsCodes,
      isShowSelectShoppingCartModal,
      goodsList,
      isShowModalLoading,
    } = this.state;

    return (
      <div className="baby-love-admin-shopping-cart">
        <ShoppingCartChangeActions
          resetShoppingCart={this.resetShoppingCart}
          showSelectShoppingCartModal={this.showSelectShoppingCartModal}
        />
        <GoodsList
          goodsList={goodsList}
          selectGoodsCodes={selectGoodsCodes}
          selectGoods={this.selectGoods}
          changeCount={this.changeCount}
          stopPropagation={this.stopPropagation}
          toGoodsDetails={this.toGoodsDetails}
        />
        <OrderInfo
          totalPrice={totalPrice}
          goodsList={goodsList}
          selectGoodsCodes={selectGoodsCodes}
          selectAllGoods={this.selectAllGoods}
          remove={this.remove}
          buy={this.buy}
        />
        <ShoppingCartSelectModal
          isShowSelectShoppingCartModal={isShowSelectShoppingCartModal}
          isShowModalLoading={isShowModalLoading}
          shoppingCartList={shoppingCartList}
          selectShoppingCart={this.selectShoppingCart}
          closeModal={this.closeSelectShoppingCartModal}
          searchShoppingCart={this.searchShoppingCart}
        />
      </div>
    );
  }
}

export default ShoppingCart;

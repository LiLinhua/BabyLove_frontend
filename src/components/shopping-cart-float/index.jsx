import ShoppingCartIcon from "@/assets/shopping-cart.png";
import { inject, observer } from "mobx-react";
import { Component } from "react";
import { goTo, getShoppingCartCode } from "../../common/utils";
import "./index.less";

@inject("ShoppingCart")
@observer
class ShoppingCartFloat extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 刷新购物车商品数据
    this.props.ShoppingCart?.flushShoppingCartGoodsCount();
  }

  /**
   * 跳转购物车页
   * @returns
   */
  handleGoToCart = async () => {
    const shoppingCartCode = await getShoppingCartCode();
    goTo(`/shopping-cart?shoppingCartCode=${shoppingCartCode || ''}`);
  };

  render() {
    return (
      <div className="baby-love-goods-to-cart" onClick={this.handleGoToCart}>
        <span>{this.props.ShoppingCart?.goodsCount || 0}</span>
        <img src={ShoppingCartIcon} />
      </div>
    );
  }
}

export default ShoppingCartFloat;

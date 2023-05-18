import ShoppingCartIcon from "@/assets/shopping-cart.png";
import { inject, observer } from "mobx-react";
import { Component } from "react";
import { history } from "umi";
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
  handleGoToCart = () => {
    if (location.pathname.startsWith("/view/admin/")) {
      return history.push("/view/admin/shopping-cart");
    }
    history.push("/view/shopping-cart");
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

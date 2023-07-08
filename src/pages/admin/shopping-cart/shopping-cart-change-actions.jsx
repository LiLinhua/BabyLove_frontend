import { Button } from "antd-mobile";
import React from "react";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { resetShoppingCart, showSelectShoppingCartModal } = this.props;
    return (
      <div className="baby-love-admin-shopping-cart-show-select-btn">
        <Button color="primary" size="mini" onClick={resetShoppingCart}>
          重置
        </Button>
        <Button
          color="primary"
          size="mini"
          onClick={showSelectShoppingCartModal}
        >
          选择
        </Button>
      </div>
    );
  }
}

export default ShoppingCart;

import { Button } from "antd-mobile";
import React from "react";

class AddToShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { addToCart } = this.props;
    return (
      <div className="baby-love-custom-goods-details-add-to-cart">
        <Button color="primary" onClick={addToCart}>
          加入购物车
        </Button>
      </div>
    );
  }
}

export default AddToShoppingCart;

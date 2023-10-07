import { Button } from "antd-mobile";
import { goodsStatus as goodsStatusEnums } from "@/common/constant";
import React from "react";

class AddToShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { addToCart, goodsStatus, goodsInventory } = this.props;
  
    return (
      <div className="baby-love-admin-goods-details-add-to-cart">
        <Button disabled={goodsInventory < 1 || goodsStatus === goodsStatusEnums.OFFLINE.value} color="primary" onClick={addToCart}>
          加入购物车
        </Button>
      </div>
    );
  }
}

export default AddToShoppingCart;

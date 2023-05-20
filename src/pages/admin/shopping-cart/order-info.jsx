import { Button, Checkbox } from "antd-mobile";
import React from "react";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      totalPrice,
      goodsList,
      selectGoodsCodes,
      selectAllGoods,
      remove,
      buy,
    } = this.props;
    return (
      <div className="baby-love-admin-shopping-cart-goods-order">
        <span className="baby-love-admin-shopping-cart-goods-order-price">
          <span className="baby-love-admin-shopping-cart-goods-select-all">
            <Checkbox
              checked={
                selectGoodsCodes?.length !== 0 &&
                selectGoodsCodes?.length === goodsList.length
              }
              onChange={selectAllGoods}
            />
          </span>
          <span className="baby-love-admin-shopping-cart-goods-total-price">
            合计：¥{totalPrice.toFixed(2)}
          </span>
        </span>

        <div>
          <Button className="baby-love-admin-shopping-cart-goods-remove-btn" color="default" onClick={remove}>
            删除
          </Button>
          <Button color="primary" onClick={buy}>
            下单
          </Button>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;

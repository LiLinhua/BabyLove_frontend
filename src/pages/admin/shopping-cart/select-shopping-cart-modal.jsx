import { DotLoading, List, Modal } from "antd-mobile";
import React from "react";

class SelectShoppingCartModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      isShowSelectShoppingCartModal,
      isShowModalLoading,
      shoppingCartList,
      selectShoppingCart,
    } = this.props;

    let modalContent = <DotLoading color="primary" />;
    if (!isShowModalLoading && shoppingCartList.length) {
      modalContent = (
        <List>
          {shoppingCartList.map((shoppingCart) => (
            <List.Item onClick={() => selectShoppingCart(shoppingCart)}>
              {shoppingCart.shoppingCartCode}
            </List.Item>
          ))}
        </List>
      );
    } else {
      modalContent = (
        <div className="baby-love-admin-shopping-cart-select-cart-empty">
          暂无数据
        </div>
      );
    }
    return (
      <Modal
        title="选择购物车"
        visible={isShowSelectShoppingCartModal}
        content={
          <div className="baby-love-admin-shopping-cart-select-cart">
            {modalContent}
          </div>
        }
      />
    );
  }
}

export default SelectShoppingCartModal;

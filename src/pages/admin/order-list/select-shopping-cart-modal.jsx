import { DotLoading, List, Modal, SearchBar } from "antd-mobile";
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
      closeModal,
      searchShoppingCart,
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
        <div className="baby-love-admin-order-list-select-cart-empty">
          暂无数据
        </div>
      );
    }
    return (
      <Modal
        title="选择购物车"
        visible={isShowSelectShoppingCartModal}
        onClose={closeModal}
        showCloseButton
        onAction={closeModal}
        actions={[
          {
            key: "close",
            text: "关闭",
          },
        ]}
        content={
          <div className="baby-love-admin-order-list-select-cart">
            <div className="baby-love-admin-order-list-select-cart-content">{modalContent}</div>
            <SearchBar placeholder="请输入内容" onChange={searchShoppingCart} />
          </div>
        }
      />
    );
  }
}

export default SelectShoppingCartModal;

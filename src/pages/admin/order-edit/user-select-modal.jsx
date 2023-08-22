import { DotLoading, List, Modal, SearchBar, Ellipsis } from "antd-mobile";
import React from "react";

class SelectUserModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      isShowSelectUserModal,
      isShowModalLoading,
      userList,
      selectUser,
      closeModal,
      searchUser,
    } = this.props;

    let modalContent = <DotLoading color="primary" />;
    if (!isShowModalLoading && userList.length) {
      modalContent = (
        <List>
          {userList.map((user) => (
            <List.Item key={user.userCode} onClick={() => selectUser(user)}>
              <Ellipsis
                direction="end"
                rows={1}
                content={
                  user
                    ? `${user.userName}(${user.userNickname || user.userCode})`
                    : "-"
                }
              />
            </List.Item>
          ))}
        </List>
      );
    } else {
      modalContent = (
        <div className="baby-love-admin-order-select-user-empty">暂无数据</div>
      );
    }
    return (
      <Modal
        title="选择用户"
        visible={isShowSelectUserModal}
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
          <div className="baby-love-admin-order-select-user">
            <div className="baby-love-admin-order-select-user-content">
              {modalContent}
            </div>
            <SearchBar placeholder="请输入内容" onChange={searchUser} />
          </div>
        }
      />
    );
  }
}

export default SelectUserModal;

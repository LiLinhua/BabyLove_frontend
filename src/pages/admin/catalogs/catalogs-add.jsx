import { Dialog, Input, Toast } from "antd-mobile";
import { AddCircleOutline } from "antd-mobile-icons";
import React from "react";
import { adminCreateCatalog } from "../../../common/apis";
import request from "../../../common/http";

class CatalogsAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      catalogCode: props.catalogCode,
      catalogName: props.catalogName,
    };
  }

  /**
   * 修改分类输入框值
   * @param {string} field 分类字段
   * @param {string} value 分类值
   */
  changeCatalogInput = (field, value) => {
    this.setState({ [field]: value });
  };

  /**
   * 确认新增分类
   * @param {event} e 事件
   */
  comfirmCreateCatalog = async () => {
    const { catalogCode, catalogName } = this.state;
    if (!catalogCode) {
      Toast.show({
        icon: "fail",
        content: "分类编码不能为空",
      });
      return;
    }
    if (!catalogName) {
      Toast.show({
        icon: "fail",
        content: "分类名称不能为空",
      });
      return;
    }
    const { success, message } = await request.post(adminCreateCatalog, {
      catalogCode,
      catalogName,
    });

    if (!success) {
      Toast.show({
        icon: "fail",
        content: message || "新增失败",
      });
      return;
    }

    Toast.show({
      icon: "success",
      content: "新增成功",
    });
    this.props.getCatalogList();
  };

  /**
   * 添加分类
   */
  addCatalog = () => {
    this.setState(
      {
        catalogCode: "",
        catalogName: "",
      },
      () => {
        Dialog.confirm({
          content: (
            <div className="baby-love-admin-catalog-list-add-form">
              <Input
                defaultValue={this.state.catalogCode}
                placeholder="请输入编码"
                onChange={(value) =>
                  this.changeCatalogInput("catalogCode", value)
                }
              />
              <Input
                defaultValue={this.state.catalogName}
                placeholder="请输入分类名"
                onChange={(value) =>
                  this.changeCatalogInput("catalogName", value)
                }
              />
            </div>
          ),
          confirmText: "确定",
          onConfirm: async () => {
            await this.comfirmCreateCatalog();
          },
        });
      }
    );
  };
  render() {
    return (
      <div className="baby-love-admin-catalog-add" onClick={this.addCatalog}>
        <AddCircleOutline />
      </div>
    );
  }
}

export default CatalogsAdd;

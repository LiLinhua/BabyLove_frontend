import { Button, Dialog, DotLoading, Input, Toast } from "antd-mobile";
import React from "react";
import { adminRemoveCatalog, adminUpdateCatalog } from "../../../common/apis";
import request from "../../../common/http";

class CatalogList extends React.Component {
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
   * 确认修改分类
   */
  comfirmEditCatalogName = async () => {
    const { catalogCode, catalogName } = this.state;
    const { success, message } = await request.post(adminUpdateCatalog, {
      catalogCode,
      catalogName,
    });

    if (!success) {
      Toast.show({
        icon: "fail",
        content: message || "更新失败",
      });
      return;
    }

    Toast.show({
      icon: "success",
      content: "更新成功",
    });
    this.props.getCatalogList();
  };

  /**
   * 编辑分类
   * @param {string} catalogCode 分类编码
   * @param {number} catalogName 分类名
   */
  updateCatalog = (catalogCode, catalogName) => {
    this.setState(
      {
        catalogCode,
        catalogName,
      },
      () => {
        Dialog.confirm({
          content: (
            <div className="baby-love-admin-catalog-list-update-form">
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
            await this.comfirmEditCatalogName();
          },
        });
      }
    );
  };

  /**
   * 删除分类
   * @param {string} catalogCode 分类编码
   */
  removeCatalog = async (catalogCode) => {
    const result = await Dialog.confirm({
      content: "确定删除该分类吗？",
    });
    if (!result) {
      return;
    }

    const { success, message } = await request.post(adminRemoveCatalog, {
      catalogCode,
    });

    if (!success) {
      Toast.show({
        icon: "fail",
        content: message || "删除失败",
      });
      return;
    }

    Toast.show({
      icon: "success",
      content: "删除成功",
    });
    this.props.getCatalogList();
  };

  render() {
    const { catalogList, isShowLoading } = this.props;

    if (isShowLoading) {
      return <DotLoading color="primary" />;
    }

    if (!catalogList?.length) {
      return <p className="baby-love-admin-catalog-list-empty">暂无数据</p>;
    }

    return (
      <ul className="baby-love-admin-catalog-list-content">
        {catalogList.map((catalog) => (
          <li className="baby-love-admin-catalog-list-item">
            <span>{catalog.catalogCode}</span>
            <span>{catalog.catalogName}</span>
            <span>
              <Button
                size="small"
                color="primary"
                onClick={() =>
                  this.updateCatalog(catalog.catalogCode, catalog.catalogName)
                }
              >
                修改
              </Button>
              <Button
                size="small"
                color="danger"
                onClick={() => this.removeCatalog(catalog.catalogCode)}
              >
                删除
              </Button>
            </span>
          </li>
        ))}
      </ul>
    );
  }
}

export default CatalogList;

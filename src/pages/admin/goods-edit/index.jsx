import {
  Button,
  Checkbox,
  Radio,
  Form,
  ImageUploader,
  Input,
  Toast,
} from "antd-mobile";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  adminAddGoods,
  adminAddGoodsPictures,
  adminQueryGoodsDetails,
  adminUpdateGoods,
  adminQueryCatalogs,
} from "../../../common/apis";
import request from "../../../common/http";
import "./index.less";

class GoodsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogList: []
    };

    const searchParams = new URLSearchParams(location.search);
    this.goodsCode = searchParams.get("goodsCode");
  }

  formRef = React.createRef();

  componentDidMount() {
    this.getCatalogList();
    this.getGoodsDetails();
  }

  /**
   * 获取目录列表
   */
  getCatalogList = async () => {
    const { data } = await request.post(adminQueryCatalogs);

    if (Array.isArray(data)) {
      this.setState({
        catalogList: data,
      });
    }
  };

  /**
   * 获取商品详情
   */
  getGoodsDetails = async () => {
    if (!this.goodsCode) {
      return;
    }

    const { data } = await request.get(adminQueryGoodsDetails, {
      params: { goodsCode: this.goodsCode },
    });
    // 处理 form 表单数据
    if (data) {
      const formValues = { ...data };
      if (Array.isArray(data.pictures)) {
        formValues.pictures = formValues.pictures.map((picture) => {
          return { ...picture, url: picture.pictureUrl };
        });
      }
      this.formRef.current?.setFieldsValue(formValues);
    }
  };

  /**
   * 上传商品图片
   * @param {File} imgFile
   */
  uploadImgFile = async (imgFile) => {
    const formData = new FormData();
    formData.append("files", imgFile);

    const { data } = await request.post(adminAddGoodsPictures, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data && data[0]) {
      return {
        pictureCode: data[0].pictureCode,
        url: data[0].pictureUrl,
      };
    } else {
      return {};
    }
  };

  /**
   * 保存商品信息
   */
  save = async () => {
    const values = this.formRef.current?.getFieldsValue();

    values.goodsPictureCodes = values.pictures.map(
      (picture) => picture.pictureCode
    );
    let url = adminAddGoods;
    if (this.goodsCode) {
      values.goodsCode = this.goodsCode;
      url = adminUpdateGoods;
    }
    const { success } = await request.post(url, values);

    if (success) {
      Toast.show({
        content: "保存成功",
        icon: "success",
      });
      !this.goodsCode && this.formRef.current?.resetFields();
    }
  };
  /**
   * 渲染函数
   */
  render() {
    const { goodsDetails, catalogList } = this.state;
    return (
      <div className="baby-love-goods-edit">
        <div className="baby-love-goods-edit-form">
          <Form
            ref={this.formRef}
            footer={
              <Button
                block
                type="submit"
                color="primary"
                size="large"
                onClick={this.save}
              >
                保存
              </Button>
            }
          >
            <Form.Item
              name="goodsCatalog"
              label="商品分类"
              rules={[{ required: true, message: "商品分类不能为空" }]}
            >
              <Radio.Group>
                {
                  catalogList.map(catalog => (
                    <Radio value={catalog.catalogCode}>{catalog.catalogName}</Radio>
                  ))
                }
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="goodsTitle"
              label="商品标题"
              rules={[{ required: true, message: "商品标题不能为空" }]}
            >
              <Input placeholder="请输入商品标题" />
            </Form.Item>
            <Form.Item
              name="goodsSubtitle"
              label="商品副标题"
              rules={[{ required: false, message: "商品副标题不能为空" }]}
            >
              <Input placeholder="请输入商品副标题" />
            </Form.Item>
            <Form.Item
              name="pictures"
              label="商品图片"
              rules={[{ required: true, message: "商品图片不能为空" }]}
            >
              <ImageUploader upload={this.uploadImgFile} />
            </Form.Item>
            <Form.Item
              name="goodsPrice"
              label="商品价格"
              rules={[{ required: true, message: "商品价格不能为空" }]}
            >
              <Input min={0} type="number" placeholder="请输入商品价格" />
            </Form.Item>
            <Form.Item
              name="goodsOriginPrice"
              label="商品原价"
              rules={[{ required: true, message: "商品原价不能为空" }]}
            >
              <Input min={0} type="number" placeholder="请输入商品原价" />
            </Form.Item>
            <Form.Item
              name="goodsInventory"
              label="商品库存"
              rules={[{ required: true, message: "商品库存不能为空" }]}
            >
              <Input min={0} type="number" placeholder="请输入商品库存" />
            </Form.Item>
            <Form.Item
              name="goodsDetails"
              label="商品详情"
              rules={[{ required: false, message: "商品详情不能为空" }]}
            >
              <ReactQuill
                theme="snow"
                value={goodsDetails}
                onChange={this.setGoodsDetails}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default GoodsEdit;

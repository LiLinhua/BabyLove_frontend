import { Button, Checkbox, Form, ImageUploader, Input } from "antd-mobile";
import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./index.less";

class GoodsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgFileList: [],
    }
  }
  formRef = React.createRef();
  componentDidMount() {}

  setImgFileList = (imgFileList) => {
    this.setState({ imgFileList });
  }
  uploadImgFile = (imgFile) => {
    console.log(imgFile)
    return {
      url: URL.createObjectURL(imgFile),
    }
  }
  setGoodsDetails = () => {

  }
  save = () => {
    const { username, password } = this.formRef.current?.getFieldsValue();

    console.log("===========", username, password);
  };
  render() {
    const { imgFileList, goodsDetails }= this.state;
    return (
      <div className="baby-love-goods-edit">
        <div className="baby-love-goods-edit-form">
          <Form
            ref={this.formRef}
            footer={
              <Button block type="submit" color="primary" size="large">
                保存
              </Button>
            }
          >
            <Form.Item
              name="goodsCatalog"
              label="商品分类"
              rules={[{ required: true, message: "商品分类不能为空" }]}
            >
              <Checkbox.Group>
                <Checkbox value="CHILDREN_CLOTHING">童装</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              name="goodsTitle"
              label="商品标题"
              rules={[{ required: true, message: "商品标题不能为空" }]}
            >
              <Input onChange={console.log} placeholder="请输入商品标题" />
            </Form.Item>
            <Form.Item
              name="goodsSubtitle"
              label="商品副标题"
              rules={[{ required: true, message: "商品副标题不能为空" }]}
            >
              <Input onChange={console.log} placeholder="请输入商品副标题" />
            </Form.Item>
            <Form.Item
              name="pictures"
              label="商品图片"
              rules={[{ required: true, message: "商品图片不能为空" }]}
            >
              <ImageUploader
                value={imgFileList}
                onChange={this.setImgFileList}
                upload={this.uploadImgFile}
              />
            </Form.Item>
            <Form.Item
              name="goodsPrice"
              label="商品价格"
              rules={[{ required: true, message: "商品价格不能为空" }]}
            >
              <Input
                min={0}
                type="number"
                onChange={console.log}
                placeholder="请输入商品价格"
              />
            </Form.Item>
            <Form.Item
              name="goodsDetails"
              label="商品详情"
              rules={[{ required: true, message: "商品详情不能为空" }]}
            >
              <ReactQuill theme="snow" value={goodsDetails} onChange={this.setGoodsDetails} />
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default GoodsEdit;

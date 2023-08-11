import { Button, DatePicker, Form, Input, Radio, Toast, TextArea } from "antd-mobile";
import React from "react";
import DayJS from "dayjs";
import "react-quill/dist/quill.snow.css";
import { adminQueryUserDetails, adminAddUser, adminUpdateUser } from "../../../common/apis";
import request from "../../../common/http";
import "./index.less";

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      isShowBirthdayPicker: false,
      isShowWeddingDatePicker: false,
      isLoading: false,
    };

    const searchParams = new URLSearchParams(location.search);
    this.userCode = searchParams.get("userCode");
  }

  formRef = React.createRef();

  componentDidMount() {
    this.getUserDetails();
  }

  /**
   * 获取用户详情
   */
  getUserDetails = async () => {
    if (!this.userCode) {
      return;
    }

    const { data } = await request.post(adminQueryUserDetails, {
      userCode: this.userCode,
    });

    // 处理 form 表单数据
    if (data) {
      data.userBirthday = data.userBirthday ? DayJS(data.userBirthday).format('YYYY-MM-DD') : '';
      data.userWeddingDate = data.userWeddingDate ? DayJS(data.userWeddingDate).format('YYYY-MM-DD') : '';
      this.formRef.current?.setFieldsValue(data);
    }
  };

  /**
   * 保存用户信息
   */
  save = async () => {
    const values = this.formRef.current?.getFieldsValue();

    let url = adminAddUser;
    if (this.userCode) {
      values.userCode = this.userCode;
      url = adminUpdateUser;
    }
    this.setState({ isLoading: true });
    const { success } = await request.post(url, values);

    if (success) {
      Toast.show({
        content: "保存成功",
        icon: "success",
      });
      !this.userCode && this.formRef.current?.resetFields();
    }
    this.setState({ isLoading: false });
  };

  /**
   * 显示出生日期选择弹窗
   */
  showBirthdayPicker = () => {
    this.setState({ isShowBirthdayPicker: true });
  };

  /**
   * 显示结婚纪念日日期选择弹窗
   */
  showWeddingDatePicker = () => {
    this.setState({ isShowWeddingDatePicker: true });
  };

  /**
   * 设置出生日期
   */
  setBirthday = (value) => {
    this.formRef.current?.setFieldsValue({ userBirthday: DayJS(value).format('YYYY-MM-DD') });
  };

  /**
   * 设置结婚纪念日
   */
  setWeddingDate = (value) => {
    this.formRef.current?.setFieldsValue({ userWeddingDate: DayJS(value).format('YYYY-MM-DD') });
  };

  /**
   * 渲染函数
   */
  render() {
    const now = new Date();
    const { isShowBirthdayPicker, isShowWeddingDatePicker, isLoading } = this.state;
    const isRequired = !this.userCode;
    return (
      <div className="baby-love-user-edit">
        <div className="baby-love-user-edit-form">
          <Form
            ref={this.formRef}
            initialValues={{
              isAdmin: 0,
            }}
            footer={
              <Button
                block
                type="submit"
                color="primary"
                size="large"
                loading={isLoading}
                onClick={this.save}
              >
                保存
              </Button>
            }
          >
            <Form.Item
              name="userName"
              label="用户名"
              rules={[{ required: isRequired, message: "用户名不能为空" }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="userPassword"
              label="用户密码"
              rules={[{ required: isRequired, message: "用户密码不能为空" }]}
            >
              <Input type="password" placeholder="请输入用户密码" />
            </Form.Item>
            <Form.Item
              name="userPhone"
              label="手机号"
              rules={[{ required: isRequired, message: "用户手机号不能为空" }]}
            >
              <Input type="number" placeholder="请输入用户手机号" />
            </Form.Item>
            <Form.Item
              name="userBirthday"
              label="出生日期"
              rules={[{ required: false }]}
              onClick={this.showBirthdayPicker}
            >
              <Input readOnly placeholder="请选择出生日期" />
            </Form.Item>
            <Form.Item
              name="userAddress"
              label="住址"
              rules={[{ required: false }]}
            >
              <Input placeholder="请输入用户住址" />
            </Form.Item>
            <Form.Item
              name="userWeddingDate"
              label="结婚纪念日"
              rules={[{ required: false }]}
              onClick={this.showWeddingDatePicker}
            >
              <Input readOnly placeholder="请选择结婚纪念日" />
            </Form.Item>
            <Form.Item
              name="userFavorite"
              label="喜好"
              rules={[{ required: false }]}
            >
              <TextArea placeholder="请输入用户喜好" autoSize />
            </Form.Item>
            <Form.Item
              name="userOthers"
              label="其他"
              rules={[{ required: false }]}
            >
              <TextArea placeholder="请输入用户其他信息" autoSize />
            </Form.Item>
            <Form.Item
              name="isAdmin"
              label="是否是管理员"
              rules={[{ required: isRequired, message: "请选择是否是管理员" }]}
            >
              <Radio.Group>
                <Radio value={0}>否</Radio>
                <Radio value={1}>是</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </div>
        <DatePicker
          title="出生日期选择"
          visible={isShowBirthdayPicker}
          onClose={() => {
            this.setState({ isShowBirthdayPicker: false });
          }}
          max={now}
          onConfirm={this.setBirthday}
        />
        <DatePicker
          title="结婚纪念日选择"
          visible={isShowWeddingDatePicker}
          onClose={() => {
            this.setState({ isShowWeddingDatePicker: false });
          }}
          max={now}
          onConfirm={this.setWeddingDate}
        />
      </div>
    );
  }
}

export default UserEdit;

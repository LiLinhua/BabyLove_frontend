import { login } from "@/common/apis";
import request from "@/common/http";
import { goTo, setLoginSuccessFlag } from "@/common/utils";
import { Button, Form, Input } from "antd-mobile";
import React from "react";

import "./index.less";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  formRef = React.createRef();

  /**
   * 登录
   */
  login = async () => {
    this.setState({ isLoading: true });

    const { username, password } = this.formRef.current?.getFieldsValue([
      "username",
      "password",
    ]);

    try {
      const { success } = await request.post(login, {
        username,
        password,
      });
      if (success) {
        setLoginSuccessFlag();
        // 产品编码
        const searchParams = new URLSearchParams(location.search);
        return goTo(searchParams.get("callback") || "/", false, true);
      }
    } catch (error) {
      console.error(error);
    }

    this.setState({ isLoading: false });
  };

  /**
   * 渲染函数
   */
  render() {
    return (
      <div className="baby-love-login">
        <div className="baby-love-login-form">
          <Form
            ref={this.formRef}
            layout="horizontal"
            footer={
              <Button
                block
                type="submit"
                color="primary"
                size="large"
                onClick={this.login}
                loading={this.state.isLoading}
              >
                登录
              </Button>
            }
          >
            <Form.Item
              name="username"
              label="登录名"
              rules={[{ required: true, message: "登录名不能为空" }]}
            >
              <Input onChange={console.log} placeholder="请输入登录名" />
            </Form.Item>
            <Form.Item
              name="password"
              label="登录密码"
              rules={[{ required: true, message: "登录名不能为空" }]}
            >
              <Input
                type="password"
                onChange={console.log}
                placeholder="请输入登录密码"
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;

import { Button, Form, Input } from "antd-mobile";
import React from "react";

import "./index.less";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  formRef = React.createRef();
  componentDidMount() {}
  login = () => {
    const { username, password } = this.formRef.current?.getFieldsValue([
      "username",
      "password",
    ]);

    console.log("===========", username, password);
  };
  render() {
    return (
      <div className="baby-love-login">
        <div className="baby-love-login-form">
          <Form
            ref={this.formRef}
            layout="horizontal"
            footer={
              <Button block type="submit" color="primary" size="large">
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

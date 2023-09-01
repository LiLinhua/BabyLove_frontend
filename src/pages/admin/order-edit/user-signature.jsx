import { adminUpdateOrderBaseInfo } from "@/common/apis";
import request from "@/common/http";
import { Button, Mask, Toast } from "antd-mobile";
import React from "react";
import SignatureCanvas from "react-signature-canvas";

import "./index.less";

class UserSignature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowMask: false,
    };
  }

  showMask = () => {
    this.setState({ isShowMask: true }, () => {
      setTimeout(() => {
        this.sigCanvas.fromDataURL(this.props.userSignature, { velocityFilterWeight: 2 });
      }, 500)
    });
  };

  closeMask = () => {
    this.setState({ isShowMask: false });
  };

  clearSignature = () => {
    this.sigCanvas.clear();
  };

  confirmSignature = async () => {
    const { orderCode, flushOrderDetails } = this.props;
    if (this.sigCanvas.isEmpty()) {
      return Toast.show({
        content: "请先签名",
      });
    }
    const { success, message } = await request.post(adminUpdateOrderBaseInfo, {
      orderCode,
      userSignature: this.sigCanvas.toDataURL(),
    });
    if (success) {
      Toast.show({
        content: "保存成功",
        icon: "success",
      });
      this.setState({ isShowMask: false }, flushOrderDetails);
    } else {
      Toast.show({
        content: message || "保存失败，请稍后再试",
        icon: "success",
      });
    }
  };

  /**
   * 渲染函数
   */
  render() {
    return (
      <div className="baby-love-admin-order-details-signature">
        <Mask visible={this.state.isShowMask}>
          <div className="baby-love-admin-order-details-signature-content">
            <SignatureCanvas
              ref={(ref) => {
                this.sigCanvas = ref;
              }}
              penColor="black"
              canvasProps={{
                width: window.innerWidth - 40,
                height: window.innerHeight - 60,
              }}
              backgroundColor="white"
            />
          </div>

          <div className="baby-love-admin-order-details-signature-actions">
            <Button onClick={this.clearSignature}>清除</Button>
            <Button color="primary" onClick={this.confirmSignature}>
              确认
            </Button>
            <Button onClick={this.closeMask}>关闭</Button>
          </div>
        </Mask>
        <Button color="primary" disabled={this.props.isCanNotModify} onClick={this.showMask}>
          客户签名
        </Button>
      </div>
    );
  }
}

export default UserSignature;

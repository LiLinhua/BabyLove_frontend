import React from "react";

import "./index.less";

class Raffle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      totalCountArr: ["5 0 积分", "100元话费", "谢谢参与", "10元话费"],
      // 记录当前是否正在旋转，如果正在旋转，就不能继续点击了
      isRotationing: false,
      // 奖励信息
      rewardInfo: {
        deg: 0,
        text: "谢谢参与",
      },
    };
    this.currentDeg = 0;
    this.intervalDeg = 360 / this.state.totalCountArr.length;
  }

  /**
   * 开始抽奖
   */
  start = async () => {
    if (this.state.isRotationing) {
      return;
    }
    this.setState({ isRotationing: true });
    // 转三圈到四圈
    this.currentDeg += Math.random() * 360 + 1080;
    let rewardText =
      this.state.totalCountArr[
        Math.floor(
          ((this.currentDeg + this.intervalDeg / 2) % 360) /
            (360 / this.state.totalCountArr.length)
        )
      ];
    this.setState({
      rewardInfo: {
        deg: this.currentDeg,
        text:
          rewardText === "谢谢参与"
            ? "很遗憾，您没有获得奖品。"
            : "恭喜获得: " + rewardText,
      },
    });
  };

  /**
   * 指针转动结束
   */
  pointerTransitionEnd = () => {
    setTimeout(() => {
      // 等闪烁三下结束
      this.setState({ isRotationing: false });
    }, 300);
  };

  /**
   * 渲染函数
   */
  render() {
    const { totalCountArr, isRotationing, rewardInfo } = this.state;
    return (
      <div className="baby-love-raffle">
        <div className="baby-love-raffle-wrapper">
          {totalCountArr.map((item, index) => (
            <div
              key={index}
              style={{ transform: `rotate(${index * this.intervalDeg}deg)` }}
              className={`baby-love-raffle-light ${
                isRotationing ? "baby-love-raffle-light-twinkling" : ""
              }`}
            ></div>
          ))}
          <div className="baby-love-raffle-panel">
            {totalCountArr.map((item, index) => (
              <div
                key={index}
                style={{
                  transform: `rotate(${
                    index * this.intervalDeg - this.intervalDeg / 2
                  }deg)`,
                }}
                className="baby-love-raffle-sector"
              >
                <div
                  style={{
                    transform: `translateX(-100px) rotate(${this.intervalDeg}deg)`,
                  }}
                  className="baby-love-raffle-sector-inner"
                >
                  <span>{item}</span>
                </div>
              </div>
            ))}
            <div
              className="baby-love-raffle-pointer"
              style={{ transform: `rotateZ(${rewardInfo.deg}deg)` }}
              onClick={this.start}
              onTransitionEnd={this.pointerTransitionEnd}
            >
              开始抽奖
            </div>
          </div>
        </div>
        <div className="baby-love-raffle-result">
          {isRotationing ? "" : rewardInfo.text}
        </div>
      </div>
    );
  }
}

export default Raffle;

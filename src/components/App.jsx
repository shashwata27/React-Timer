import React from "react";
import Button from "./Button";
import iconConfig from "../utils/iconConfig";
import timeFormatter from "../utils/timeFormatter";
import strings from "../utils/strings";
import timeSVG from "../svg/time.svg";

export default class App extends React.Component {
  state = { timer: 0, start: false, ranBefore: false };
  ref = null;

  // clockStatus=0 not started ever
  //            =1 running
  //            =2 paused

  handelStart = () => {
    this.setState({ start: true, ranBefore: true });
    this.ref = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 10);
  };
  handelPause = () => {
    this.setState({ start: false, ranBefore: true });
    clearInterval(this.ref);
  };

  handelReset = () => {
    this.setState({ timer: 0, start: false, ranBefore: false });
    clearInterval(this.ref);
  };

  renderButtons = () => {
    let handler, text, color, icon;
    if (!this.state.start && !this.state.ranBefore) {
      handler = this.handelStart;
      text = strings.text.start;
      color = strings.color.green;
      icon = iconConfig.play;
    } else {
      if (this.state.start && this.state.ranBefore) {
        handler = this.handelPause;
        text = strings.text.pause;
        color = strings.color.yellow;
        icon = iconConfig.pause;
      } else {
        handler = this.handelStart;
        text = strings.text.resume;
        color = strings.color.orange;
        icon = iconConfig.play;
      }
    }

    return (
      <Button
        float="right floated"
        handler={handler}
        text={text}
        color={color}
        icon={icon}
      />
    );
  };

  render() {
    return (
      <div className="conatiner">
        <div className="ui card">
          <div className="ui header">Timer</div>
          <div className="mainDisplay content">
            {iconConfig.clock}
            <span>{timeFormatter(this.state.timer)}</span>
          </div>
          <div className="extra content">
            {this.renderButtons()}
            <Button
              handler={this.handelReset}
              text={strings.text.reset}
              color={strings.color.red}
              disabled={!this.state.start && !this.state.ranBefore}
              icon={iconConfig.reset}
            />
          </div>
        </div>
        <div className="svgImage">
          <img src={timeSVG} alt="Time vector" />
        </div>
      </div>
    );
  }
}

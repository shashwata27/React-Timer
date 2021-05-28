import React from "react";
import Button from "./Button";
import iconConfig from "../utils/iconConfig";
import timeFormatter from "../utils/timeFormatter";
import strings from "../utils/strings";
import timeSVG from "../svg/time.svg";

export default class App extends React.Component {
  // clockStatus=0 not started ever
  //            =1 running
  //            =2 paused
  state = { timer: 0, clockStaus: 0 };
  ref = null;

  handelStart = () => {
    // sets status to running
    this.setState({ clockStaus: 1 });
    this.ref = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 10);
  };
  handelPause = () => {
    // sets to paused
    this.setState({ clockStaus: 2 });
    clearInterval(this.ref);
  };

  handelReset = () => {
    // resets
    this.setState({ timer: 0, clockStaus: 0 });
    clearInterval(this.ref);
  };

  renderButtons = () => {
    let handler, text, color, icon;
    // when never ran render start btn
    if (this.state.clockStaus === 0) {
      handler = this.handelStart;
      text = strings.text.start;
      color = strings.color.green;
      icon = iconConfig.play;
    } else {
      // when running render pause btn
      if (this.state.clockStaus === 1) {
        handler = this.handelPause;
        text = strings.text.pause;
        color = strings.color.yellow;
        icon = iconConfig.pause;
      } else {
        // when pause render resume btn
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
              disabled={!this.state.clockStaus}
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

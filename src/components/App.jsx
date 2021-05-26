import React from "react";
import Buttons from "./Buttons";
import iconConfig from "../utils/iconConfig";
import timeFormatter from "../utils/timeFormatter";

export default class App extends React.Component {
  state = { timer: 0, start: false, ranBefore: false };
  ref = null;

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
  handelResume = () => {
    this.setState({ start: true, ranBefore: true });
    this.ref = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 10);
  };
  handelReset = () => {
    this.setState({ timer: 0, start: false, ranBefore: false });
    clearInterval(this.ref);
  };

  renderButtons = () => {
    let handler, text, color, icon;
    if (!this.state.start && !this.state.ranBefore) {
      handler = this.handelStart;
      text = "Start";
      color = "green";
      icon = iconConfig.play;
    } else {
      if (this.state.start && this.state.ranBefore) {
        handler = this.handelPause;
        text = "Pause";
        color = "yellow";
        icon = iconConfig.pause;
      } else {
        handler = this.handelResume;
        text = "Resume";
        color = "orange";
        icon = iconConfig.play;
      }
    }

    return (
      <Buttons
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
            <i className="clock icon"></i>
            <span>{timeFormatter(this.state.timer)}</span>
          </div>
          <div className="extra content">
            {this.renderButtons()}
            <Buttons
              handler={this.handelReset}
              text="Reset"
              color="red"
              disabled={!this.state.start && !this.state.ranBefore}
              icon={iconConfig.reset}
            />
          </div>
        </div>
      </div>
    );
  }
}

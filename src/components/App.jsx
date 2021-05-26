import React from "react";
import Buttons from "./Buttons";
import iconConfig from "../utils/iconConfig";
import timeFormatter from "../utils/timeFormatter";

export default class App extends React.Component {
  state = { timer: 0, start: false, past: false };
  ref = null;

  handelStart = () => {
    this.setState({ start: true, past: true });
    this.ref = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 10);
  };
  handelPause = () => {
    this.setState({ start: false, past: true });
    clearInterval(this.ref);
  };
  handelResume = () => {
    this.setState({ start: true, past: true });
    this.ref = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 10);
  };
  handelReset = () => {
    this.setState({ timer: 0, start: false, past: false });
    clearInterval(this.ref);
  };

  renderButtons = () => {
    return !this.state.start && !this.state.past ? (
      <Buttons
        handler={this.handelStart}
        text="Start"
        color="green"
        float="right floated"
        icon={iconConfig.play}
      />
    ) : this.state.start && this.state.past ? (
      <Buttons
        handler={this.handelPause}
        text="Pause"
        color="yellow"
        float="right floated"
        icon={iconConfig.pause}
      />
    ) : (
      <Buttons
        handler={this.handelResume}
        text="Resume"
        color="orange"
        float="right floated"
        icon={iconConfig.play}
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
              disabled={!this.state.start && !this.state.past}
              icon={iconConfig.reset}
            />
          </div>
        </div>
      </div>
    );
  }
}

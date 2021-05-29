import React from "react";
import Button from "./Button";
import iconConfig from "../utils/iconConfig";
import timeFormatter from "../utils/timeFormatter";
import strings from "../utils/strings";
import constants from "../utils/constants";
import timeSVG from "../svg/time.svg";

// destructuring imported util files
const { clock } = constants;
const { text, color } = strings;

export default class App extends React.Component {
  // clockStatus=0 not started ever
  //            =1 running
  //            =2 paused
  state = { timer: 0, clockStaus: 0 };
  ref = null;

  handelStart = () => {
    // sets status to running
    this.setState({ clockStaus: clock.RUNNING });
    this.ref = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 10);
  };
  handelPause = () => {
    // sets to paused
    this.setState({ clockStaus: clock.PAUSED });
    clearInterval(this.ref);
  };

  handelReset = () => {
    // resets
    this.setState({ timer: 0, clockStaus: clock.NOT_STARTED });
    clearInterval(this.ref);
  };

  renderButtons = () => {
    let handler, txt, clor, icon;

    switch (this.state.clockStaus) {
      // when never ran render start btn
      case clock.NOT_STARTED: {
        handler = this.handelStart;
        txt = text.start;
        clor = color.green;
        icon = iconConfig.play;
        break;
      }
      // when running render pause btn
      case clock.RUNNING: {
        handler = this.handelPause;
        txt = text.pause;
        clor = color.yellow;
        icon = iconConfig.pause;
        break;
      }
      // when pause render resume btn
      case clock.PAUSED: {
        handler = this.handelStart;
        txt = text.resume;
        clor = color.orange;
        icon = iconConfig.play;
        break;
      }
      default: {
        //nothing
      }
    }

    return (
      <Button
        float="right floated"
        handler={handler}
        text={txt}
        color={clor}
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
              text={text.reset}
              color={color.red}
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

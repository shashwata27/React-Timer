import React from "react";

export default class Buttons extends React.Component {
  render() {
    return (
      <button
        className={`ui button ${this.props.color} ${this.props.float}`}
        disabled={this.props.disabled}
        onClick={this.props.handler}
      >
        {this.props.icon}
        {this.props.text}
      </button>
    );
  }
}

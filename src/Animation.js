import React, { Component } from "react";
import { loader } from "./animation.css";
export class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  render() {
    return <div className={this.state.counter ? "" : "loader"} />;
  }
}

export default Animation;

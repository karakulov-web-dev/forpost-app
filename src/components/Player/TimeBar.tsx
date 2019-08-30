import * as React from "react";
import { timeBarStyle } from "./style";

interface IProp {
  time: number;
}

export default class TimeBar extends React.Component<IProp> {
  render() {
    return <div style={timeBarStyle}>{this.props.time}</div>;
  }
}

import * as React from "react";
import { progressBarCursor, progressBarCursorBody } from "./style";

interface IProp {
  percents: number;
}
export default class ProgressBarCursor extends React.Component<IProp> {
  render() {
    return (
      <div style={{ ...progressBarCursor, left: this.calcPosition() }}>
        <div style={progressBarCursorBody}></div>
      </div>
    );
  }
  calcPosition() {
    const maxLeft = 96;
    const leftPos = this.props.percents * (maxLeft / 100);
    return `${leftPos}%`;
  }
}

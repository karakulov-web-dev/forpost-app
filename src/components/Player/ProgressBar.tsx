import * as React from "react";
import {
  progressBarStyle,
  progressBarStyleLine,
  progressBarStyleInternalLine
} from "./style";
import { color3 } from "../style";
import ProgressBarCursor from "./ProgressBarCursor";

interface IProp {
  focus: boolean;
  time: number;
}

export default class ProgressBar extends React.Component<IProp> {
  private elem: HTMLElement;
  private focus: boolean = false;
  render() {
    return (
      <div tabIndex={1} ref={this.setElem.bind(this)} style={progressBarStyle}>
        {this.progressLine()}
      </div>
    );
  }
  setElem(elem: HTMLElement) {
    this.elem = elem;
  }
  componentDidUpdate() {
    if (this.props.focus && !this.focus) {
      this.elem.focus();
      this.focus = true;
    } else if (!this.props.focus) {
      this.focus = false;
    }
  }
  progressLine() {
    return (
      <div
        style={{
          ...progressBarStyleLine,
          border: this.props.focus
            ? `3px solid ${color3}`
            : `3px solid transparent`
        }}
      >
        <div
          style={{
            ...progressBarStyleInternalLine,
            width: `${this.calcInternalLinePosition()}%`
          }}
        ></div>
        <ProgressBarCursor percents={this.calcPositionCursor()} />
      </div>
    );
  }

  calcPositionCursor() {
    return this.partDayPercen(new Date(this.props.time));
  }
  calcInternalLinePosition() {
    const curDate = new Date();
    const playerPosDate = new Date(this.props.time);
    if (curDate.getDate() === playerPosDate.getDate()) {
      return this.partDayPercen(new Date());
    }
    return 100;
  }
  partDayPercen(date: Date) {
    const milisecondsPerDay = 86400000; // всего милесекунд в сутках
    const oneProcentDay = milisecondsPerDay / 100; // числу милисекунд составляющих 1% суток
    const year = date.getFullYear(); // год полученный из параметра date
    const month = date.getMonth(); // месяц полученный из параметра date
    const day = date.getDate(); // день полученный из параметра date
    const dayStart = new Date(year, month, day); // обьект Date начало суток (суток текущих относительно параметра date)
    const msPassed = Number(date) - Number(dayStart); // число милисекунд прошедших с начала суток
    const positionInPercent = msPassed / oneProcentDay; // текущая позиция в процентах - отношение числа милисекунд прошедших с начала суток к числу милисекунд составляющих 1 процент суток
    return positionInPercent;
  }
}

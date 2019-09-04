import * as React from "react";
import { progressBarStyle, progressBarStyleLine } from "./style";
import { color3, color8 } from "../style";
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
            ...progressBarStyleLine,
            background: color8,
            border: "`3px solid transparent`",
            top: "0px"
          }}
        ></div>
        <ProgressBarCursor percents={this.calcPositionCursor()} />
      </div>
    );
  }
  calcPositionCursor() {
    const milisecondsPerDay = 86400000; // всего милесекунд в сутках
    const oneProcentDay = milisecondsPerDay / 100; // числу милисекунд составляющих 1% суток
    const playerPosTime = new Date(this.props.time); // обьект Date позиция плеера
    const year = playerPosTime.getFullYear(); // год полученный из обьекта позиция плеера
    const month = playerPosTime.getMonth(); // месяц полученный из  обьекта позиция плеера
    const day = playerPosTime.getDate(); // день полученный обьект Date позиция плеера
    const dayStart = new Date(year, month, day); // обьект Date начало суток (суток текущих относительно позиии плеера)
    const msPassed = Number(playerPosTime) - Number(dayStart); // число милисекунд прошедших с начала суток
    const positionInPercent = msPassed / oneProcentDay; // текущая позиция в процентах - отношение числа милисекунд прошедших с начала суток к числу милисекунд составляющих 1 процент суток
    return positionInPercent;
  }
}

import * as React from "react";
import { timeBarStyle } from "./style";
import * as date from "date-and-time";
import { color3 } from "../style";

interface IProp {
  time: number;
  focus: boolean;
}

export default class TimeBar extends React.Component<IProp> {
  private elem: HTMLElement;
  private focused = false;
  setElem(elem: HTMLElement) {
    this.elem = elem;
  }
  componentDidUpdate() {
    if (this.props.focus && !this.focused) {
      this.elem.focus();
      this.focused = true;
    } else if (!this.props.focus) {
      this.focused = false;
    }
  }
  key(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      console.log("openModalTimeSelect");
    }
  }
  render() {
    return (
      <div
        style={{
          ...timeBarStyle,
          border: this.props.focus
            ? `3px solid ${color3}`
            : `3px solid transparent`
        }}
        ref={this.setElem.bind(this)}
        tabIndex={1}
        onKeyDown={this.key.bind(this)}
      >
        {date.format(new Date(this.props.time), "HH:mm:ss  DD.MM.YYYY")}
      </div>
    );
  }
}

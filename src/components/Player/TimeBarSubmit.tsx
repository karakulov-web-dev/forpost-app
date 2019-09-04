import * as React from "react";
import { timeBarModalItemStyle } from "./style";
import { color1, color2 } from "../style";

interface IPropS1 {
  focus: boolean;
  submit: Isubmit;
}

interface Isubmit {
  (): void;
}

export default class TimeBarSubmit extends React.Component<IPropS1> {
  private elem: HTMLElement;
  private focused: boolean = false;
  setElem(elem: HTMLElement) {
    this.elem = elem;
  }
  render() {
    return (
      <button
        style={{
          ...timeBarModalItemStyle,
          border: this.props.focus
            ? `3px solid ${color1}`
            : `1px solid ${color2}`
        }}
        ref={this.setElem.bind(this)}
        onKeyDown={this.key.bind(this)}
      >
        Смотреть
      </button>
    );
  }
  componentDidUpdate() {
    if (this.props.focus && !this.focused) {
      this.elem.focus();
      this.focused = true;
    } else if (!this.props.focus && this.focused) {
      this.focused = false;
    }
  }
  key(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      this.props.submit();
    }
  }
}

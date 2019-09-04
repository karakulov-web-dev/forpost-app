import * as React from "react";
import { timeBarModalItemStyle } from "./style";
import { IselectDate } from "./TimeBarModal";
import { color1, color2 } from "../style";

interface IProp {
  focus: boolean;
  items: IselectDate[];
}

export default class TimeBarSelect extends React.Component<IProp> {
  private selectedIndex: number = 0;
  private elem: HTMLSelectElement;
  private focused: boolean = false;
  setElem(elem: HTMLSelectElement) {
    this.elem = elem;
  }
  render() {
    return (
      <select
        style={{
          ...timeBarModalItemStyle,
          border: this.props.focus
            ? `3px solid ${color1}`
            : `1px solid ${color2}`
        }}
        ref={this.setElem.bind(this)}
        onKeyDown={this.key.bind(this)}
      >
        {this.props.items.map(({ key, name, time }) => (
          <option key={key} value={time}>
            {name}
          </option>
        ))}
      </select>
    );
  }
  key(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
    }
  }
  changeActiveItem() {
    this.props.items.forEach((c, i) => {
      if (i === this.selectedIndex) {
        c.active = true;
      } else if (c.active) {
        delete c.active;
      }
    });
  }
  componentDidUpdate() {
    if (this.selectedIndex !== this.elem.selectedIndex) {
      this.selectedIndex = this.elem.selectedIndex;
      this.changeActiveItem();
    }
    if (this.props.focus && !this.focused) {
      this.elem.focus();
      this.focused = true;
    } else if (!this.props.focus && this.focused) {
      this.focused = false;
    }
  }
}

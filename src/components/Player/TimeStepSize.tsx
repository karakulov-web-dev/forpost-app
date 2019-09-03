import * as React from "react";
import {
  timeStepSizeStyle,
  timeStepSizeImgDown,
  timeStepSizeImgUp,
  timeStepSizeImgValue
} from "./style";
import { color3 } from "../style";
import { IchangeTimeStepSize } from "./Player";

interface IProp {
  focus: boolean;
  timeStepSize: number;
  changeTimeStepSize: IchangeTimeStepSize;
}

interface ItimeStepVariant {
  timeStep: number;
  name: string;
}

export default class TimeStepSize extends React.Component<IProp> {
  private elem: HTMLElement;
  private focused = false;
  private timeStepVarians: LinkedList<ItimeStepVariant>;
  constructor(props: IProp) {
    super(props);
    this.timeStepVarians = new LinkedList();
    this.timeStepVarians.add(1000, { timeStep: 1000, name: "1 сек" });
    this.timeStepVarians.add(30000, { timeStep: 30000, name: "30 сек" });
    this.timeStepVarians.add(60000, { timeStep: 60000, name: "1 мин" });
    this.timeStepVarians.add(300000, { timeStep: 300000, name: "5 мин" });
    this.timeStepVarians.add(3600000, { timeStep: 3600000, name: "1 час" });
  }
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
    const { key } = e;
    if (key === "ArrowDown" || key === "ArrowUp") e.stopPropagation();
    if (key === "ArrowDown") {
      this.props.changeTimeStepSize(this.timeStepVarians.next().timeStep);
    }
    if (key === "ArrowUp") {
      this.props.changeTimeStepSize(this.timeStepVarians.prev().timeStep);
    }
  }
  render() {
    return (
      <div
        style={{
          ...timeStepSizeStyle,
          border: this.props.focus
            ? `3px solid ${color3}`
            : `3px solid transparent`
        }}
        ref={this.setElem.bind(this)}
        tabIndex={1}
        onKeyDown={this.key.bind(this)}
      >
        <img
          src="./../forpost-app/img/baseline_arrow_drop_up_white_18dp.png"
          style={timeStepSizeImgUp}
        />
        <img
          src="./../forpost-app/img/baseline_arrow_drop_down_white_18dp.png"
          style={timeStepSizeImgDown}
        />
        <div style={timeStepSizeImgValue}>{this.switchValue()}</div>
      </div>
    );
  }
  switchValue() {
    return this.timeStepVarians.get(this.props.timeStepSize).name;
  }
}

interface NumberKeyStore<T> {
  [key: number]: T;
}

class LinkedList<T> {
  private store: NumberKeyStore<T> = {};
  private arr: T[] = [];
  private cursorPos: number = 0;
  add(index: number, data: T) {
    this.store[index] = data;
    this.arr.push(data);
  }
  get(index: number) {
    return this.store[index];
  }
  changePos(dif: number, posIsNotFound?: number) {
    let cursorPos = this.cursorPos + dif;
    if (this.arr[cursorPos]) {
      this.cursorPos = cursorPos;
    } else {
      this.cursorPos = posIsNotFound ? posIsNotFound : 0;
    }
    return this.arr[this.cursorPos];
  }
  next() {
    return this.changePos(1);
  }
  prev() {
    return this.changePos(-1, this.arr.length - 1);
  }
}

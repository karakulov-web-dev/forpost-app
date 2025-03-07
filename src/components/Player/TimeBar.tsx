import * as React from "react";
import { timeBarStyle } from "./style";
import * as date from "date-and-time";
import { color3 } from "../style";
import Modal from "./TimeBarModal";
import { IchangeTimeshift, ControlPanelStatusChanger } from "./Body";

interface IProp {
  time: number;
  focus: boolean;
  changeTimeshift: IchangeTimeshift;
  controlPanelStatus: ControlPanelStatusChanger;
}

interface IState {
  modalVisible: boolean;
}

export default class TimeBar extends React.Component<IProp, IState> {
  private elem: HTMLElement;
  private focused = false;
  constructor(props: IProp) {
    super(props);
    this.state = {
      modalVisible: false
    };
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
    if (e.key === "Enter") {
      this.switch();
    }
  }
  switch() {
    this.setState(
      { ...this.state, modalVisible: !this.state.modalVisible },
      () => {
        if (!this.state.modalVisible) {
          this.elem.focus();
        }
      }
    );
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
        {this.state.modalVisible ? (
          <Modal
            changeTimeshift={this.props.changeTimeshift}
            switch={this.switch.bind(this)}
            time={this.props.time}
            controlPanelStatus={this.props.controlPanelStatus}
          />
        ) : null}
      </div>
    );
  }
}

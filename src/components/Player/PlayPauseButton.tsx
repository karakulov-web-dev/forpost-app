import * as React from "react";
import { playPauseButtonStyle } from "./style";
import { color3 } from "../style";
import { IplayPause } from "./Body";

interface IProps {
  playStatus: boolean;
  focus: boolean;
  playPause: IplayPause;
}

export default class PlayPauseButton extends React.Component<IProps> {
  private elem: HTMLElement;
  private focused = false;
  setElem(elem: HTMLElement) {
    this.elem = elem;
  }
  componentDidMount() {
    if (this.props.focus) {
      this.elem.focus();
    }
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
      this.props.playPause();
    }
  }
  render() {
    return (
      <img
        style={{
          ...playPauseButtonStyle,
          border: this.props.focus
            ? `3px solid ${color3}`
            : `3px solid transparent`
        }}
        src={this.img()}
        ref={this.setElem.bind(this)}
        tabIndex={1}
        onKeyDown={this.key.bind(this)}
      />
    );
  }
  img() {
    return this.props.playStatus
      ? "./../forpost-app/img/baseline_pause_circle_outline_white_18dp.png"
      : "./../forpost-app/img/baseline_play_circle_outline_white_18dp.png";
  }
}

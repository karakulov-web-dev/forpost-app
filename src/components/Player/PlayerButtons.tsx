import * as React from "react";
import { playerButtonsStyle } from "./style";
import PlayPauseButton from "./PlayPauseButton";
import TimeBar from "./TimeBar";
import TimeStepSize from "./TimeStepSize";
import {
  IplayPause,
  IchangeTimeshift,
  ControlPanelStatusChanger
} from "./Body";
import { IchangeTimeStepSize } from "./Player";

interface IProps {
  playStatus: boolean;
  time: number;
  focus: boolean;
  playPause: IplayPause;
  timeStepSize: number;
  changeTimeStepSize: IchangeTimeStepSize;
  changeTimeshift: IchangeTimeshift;
  controlPanelStatus: ControlPanelStatusChanger;
}
interface IState {
  focusIndex: number;
}

export default class PlayerButtons extends React.Component<IProps, IState> {
  private elem: HTMLElement;
  private focused = false;
  setElem(elem: HTMLElement) {
    this.elem = elem;
  }
  componentDidUpdate() {
    if (this.props.focus && !this.focused) {
      this.focused = true;
      this.setState({ ...this.state, focusIndex: 0 });
    } else if (!this.props.focus && this.focused) {
      this.focused = false;
      this.setState({ ...this.state, focusIndex: -1 });
    }
  }
  constructor(props: IProps) {
    super(props);
    this.state = {
      focusIndex: 0
    };
  }
  render() {
    return (
      <div
        style={playerButtonsStyle}
        tabIndex={1}
        ref={this.setElem.bind(this)}
        onKeyDown={this.key.bind(this)}
      >
        <PlayPauseButton
          playStatus={this.props.playStatus}
          focus={this.isFocus(0)}
          playPause={this.props.playPause}
        />
        <TimeBar
          time={this.props.time}
          focus={this.isFocus(1)}
          changeTimeshift={this.props.changeTimeshift}
          controlPanelStatus={this.props.controlPanelStatus}
        />
        <TimeStepSize
          focus={this.isFocus(2)}
          timeStepSize={this.props.timeStepSize}
          changeTimeStepSize={this.props.changeTimeStepSize}
        />
      </div>
    );
  }
  key(e: React.KeyboardEvent) {
    let { focusIndex } = this.state;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.stopPropagation();
    }

    if (e.key === "ArrowLeft" && focusIndex > 0) {
      focusIndex--;
    }
    if (e.key === "ArrowRight" && focusIndex < 2) {
      focusIndex++;
    }
    this.setState({ ...this.state, focusIndex });
  }
  isFocus(index: number) {
    return index === this.state.focusIndex;
  }
}

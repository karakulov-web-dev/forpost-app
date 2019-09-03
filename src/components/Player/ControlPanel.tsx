import * as React from "react";
import { controlPanelStyle } from "./style";
import PlayerButtons from "./PlayerButtons";
import ProgressBar from "./ProgressBar";
import { IplayPause } from "./Body";
import { IchangeTimeStepSize } from "./Player";

interface IProps {
  playStatus: boolean;
  time: number;
  playPause: IplayPause;
  timeStepSize: number;
  changeTimeStepSize: IchangeTimeStepSize;
}
interface IState {
  focusIndex: number;
}

export default class ControlPanel extends React.Component<IProps, IState> {
  private elem: HTMLElement;
  constructor(props: IProps) {
    super(props);
    this.state = {
      focusIndex: 0
    };
  }
  render() {
    return (
      <div
        style={controlPanelStyle}
        tabIndex={1}
        ref={this.setElem.bind(this)}
        onKeyDown={this.key.bind(this)}
      >
        <PlayerButtons
          playStatus={this.props.playStatus}
          time={this.props.time}
          focus={this.focus(0)}
          playPause={this.props.playPause}
          timeStepSize={this.props.timeStepSize}
          changeTimeStepSize={this.props.changeTimeStepSize}
        />
        <ProgressBar focus={this.focus(1)} time={this.props.time} />
      </div>
    );
  }
  setElem(elem: HTMLElement) {
    this.elem = elem;
  }
  key(e: React.KeyboardEvent) {
    let { focusIndex } = this.state;
    if (e.key === "ArrowDown" && focusIndex === 0) {
      focusIndex = 1;
    } else if (e.key === "ArrowUp" && focusIndex === 1) {
      focusIndex = 0;
    }
    this.setState({ ...this.state, focusIndex });
  }
  componentDidMount() {
    this.elem.focus();
  }
  focus(index: number): boolean {
    return this.state.focusIndex === index;
  }
}

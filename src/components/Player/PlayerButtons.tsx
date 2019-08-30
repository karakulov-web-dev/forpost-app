import * as React from "react";
import { playerButtonsStyle } from "./style";
import PlayPauseButton from "./PlayPauseButton";
import TimeBar from "./TimeBar";

interface IProps {
  playStatus: boolean;
  time: number;
}

export default class PlayerButtons extends React.Component<IProps> {
  render() {
    return (
      <div style={playerButtonsStyle}>
        <PlayPauseButton playStatus={this.props.playStatus} />
        <TimeBar time={this.props.time} />
      </div>
    );
  }
}

import * as React from "react";
import { playerButtonsStyle } from "./style";
import PlayPauseButton from "./PlayPauseButton";

interface IProps {
  playStatus: boolean;
}

export default class PlayerButtons extends React.Component<IProps> {
  render() {
    return (
      <div style={playerButtonsStyle}>
        <PlayPauseButton playStatus={this.props.playStatus} />
      </div>
    );
  }
}

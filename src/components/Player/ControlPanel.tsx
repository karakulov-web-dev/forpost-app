import * as React from "react";
import { controlPanelStyle } from "./style";
import PlayerButtons from "./PlayerButtons";

interface IProps {
  playStatus: boolean;
  time: number;
}

export default class ControlPanel extends React.Component<IProps> {
  render() {
    return (
      <div style={controlPanelStyle}>
        <PlayerButtons
          playStatus={this.props.playStatus}
          time={this.props.time}
        />
        <div></div>
      </div>
    );
  }
}

import * as React from "react";
import { controlPanelStyle } from "./style";
import PlayerButtons from "./PlayerButtons";

interface IProps {
  playStatus: boolean;
}

export default class ControlPanel extends React.Component<IProps> {
  render() {
    return (
      <div style={controlPanelStyle}>
        <PlayerButtons playStatus={this.props.playStatus} />
        <div></div>
      </div>
    );
  }
}

import * as React from "react";
import { controlPanelStyle } from "./style";
import PlayerButtons from "./PlayerButtons";

export default class ControlPanel extends React.Component {
  render() {
    return (
      <div style={controlPanelStyle}>
        <PlayerButtons />
        <div></div>
      </div>
    );
  }
}

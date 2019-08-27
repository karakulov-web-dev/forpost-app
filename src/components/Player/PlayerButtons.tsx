import * as React from "react";
import { playerButtonsStyle } from "./style";
import PlayPauseButton from "./PlayPauseButton";

export default class PlayerButtons extends React.Component {
  render() {
    return (
      <div style={playerButtonsStyle}>
        <PlayPauseButton />
      </div>
    );
  }
}

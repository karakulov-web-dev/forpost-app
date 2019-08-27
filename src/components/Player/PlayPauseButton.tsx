import * as React from "react";

export default class PlayPauseButton extends React.Component {
  render() {
    return (
      <img
        style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          display: "block"
        }}
        src={"./../forpost-app/img/baseline_pause_white_24dp.png"}
      />
    );
  }
}

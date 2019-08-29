import * as React from "react";

interface IProps {
  playStatus: boolean;
}

export default class PlayPauseButton extends React.Component<IProps> {
  render() {
    console.log(this.props.playStatus);
    return (
      <img
        style={{
          position: "absolute",
          left: "60px",
          top: "0px",
          display: "block"
        }}
        src={this.img()}
      />
    );
  }
  img() {
    return this.props.playStatus
      ? "./../forpost-app/img/baseline_pause_white_24dp.png"
      : "./../forpost-app/img/baseline_play_arrow_white_24dp.png";
  }
}

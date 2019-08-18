import * as React from "react";
import { ICamMayBeActive } from "../Panel/Grid";
import CamBody from "./CamBody";
import {
  camItemStyle,
  camItemActiveStyle,
  nameStyle,
  nameActiveStyle
} from "./style";

interface ICamItemProps {
  cam: ICamMayBeActive;
}
export class CamItem extends React.Component<ICamItemProps> {
  render() {
    const style = this.props.cam.active ? camItemActiveStyle : camItemStyle;
    const _nameStyle = this.props.cam.active ? nameActiveStyle : nameStyle;
    return (
      <div style={style}>
        <CamBody cam={this.props.cam} />
        <p style={_nameStyle}>{this.props.cam.Name}</p>
      </div>
    );
  }
}

import * as React from "React";
import { headerStyle, logoStyle, nameAppStyle } from "./style";

export default class Header extends React.Component {
  render() {
    return (
      <div style={headerStyle}>
        <img src="./../forpost-app/img/logo.png" style={logoStyle} />
        <span style={nameAppStyle}>
          Видеоконтроль. Облачный сервис АО "РИКТ"
        </span>
      </div>
    );
  }
}

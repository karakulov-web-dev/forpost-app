import * as React from "react";
import LoginForm from "./LoginForm";
import { headerStyle, logoStyle, nameAppStyle, bodyStyle } from "./style";

export default class Login extends React.Component<any> {
  render() {
    return (
      <div>
        <div style={headerStyle}>
          <img src="./../forpost-app/img/logo.png" style={logoStyle} />
          <span style={nameAppStyle}>
            Видеоконтроль. Облачный сервис АО "РИКТ"
          </span>
        </div>
        <div style={bodyStyle}>
          <LoginForm />
        </div>
      </div>
    );
  }
}

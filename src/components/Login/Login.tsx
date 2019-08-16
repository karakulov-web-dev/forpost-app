import * as React from "react";
import LoginForm from "./LoginForm";
import { bodyStyle } from "./style";
import Header from "../Header/Header";

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div style={bodyStyle}>
          <LoginForm />
        </div>
      </div>
    );
  }
}

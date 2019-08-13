import * as React from "react";
import { loginFormStyle, color1, labelStyle, inputStyle } from "./style";

export default class LoginForm extends React.Component {
  render() {
    return (
      <form style={loginFormStyle}>
        <fieldset>
          <legend>
            <h1 style={{ color: color1, fontSize: "45px" }}>Вход</h1>
          </legend>
          <div>
            <label style={labelStyle}>
              Логин:
              <input type="text" style={inputStyle} />
            </label>
          </div>
          <div>
            <label style={labelStyle}>
              Пароль:
              <input type="password" style={inputStyle} />
            </label>
          </div>
          <div>
            <label style={labelStyle}>
              Запомнить:
              <input type="checkbox" style={inputStyle} />
            </label>
          </div>
          <div>
            <label style={labelStyle}>
              <input type="submit" value="Войти" style={inputStyle} />
            </label>
          </div>
        </fieldset>
      </form>
    );
  }
}

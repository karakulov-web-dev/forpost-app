import * as React from "react";
import {
  loginFormStyle,
  labelStyle,
  inputStyle,
  fontSize1,
  fontFamily1,
  colorError
} from "./style";
import { color1 } from "../style";
import { connect } from "react-redux";
import { Istate } from "../../state/Istate";
import { bindActionCreators } from "redux";
import {
  auth,
  IAuthActionCreator,
  ItryAutoLogin,
  tryAutoLogin
} from "../../action/auth";
declare const stb: any;

interface IRefStore {
  [key: string]: HTMLElement;
}

interface IProps {
  error: string;
  waitLoading: boolean;
  submit: IAuthActionCreator;
  tryAutoLogin: ItryAutoLogin;
}

class LoginForm extends React.Component<IProps> {
  refArrStore: HTMLElement[] = [];
  refStore: IRefStore = {};
  saveFormCheckBoxStatus: boolean = false;
  render() {
    return (
      <form
        style={loginFormStyle}
        onKeyDown={this.key.bind(this)}
        onSubmit={this.submit.bind(this)}
        ref={this.setRef.bind(this, "formRef")}
      >
        {this.ifElseLoading()}
        <p
          style={{
            fontSize: fontSize1,
            color: colorError,
            fontFamily: fontFamily1
          }}
        >
          {this.props.error}
        </p>
      </form>
    );
  }
  ifElseLoading() {
    if (this.props.waitLoading) {
      return (
        <img
          src="./../forpost-app/img/loading_4.gif"
          style={{
            margin: "100px auto",
            display: "block"
          }}
        />
      );
    } else {
      return this.fieldset();
    }
  }
  fieldset() {
    return (
      <fieldset>
        <legend>
          <h1 style={{ color: color1, fontSize: "45px" }}>Вход</h1>
        </legend>
        <div>
          <label style={labelStyle}>
            Логин:
            <input
              type="text"
              style={this.mayBeFocusStyle(inputStyle, "loginRef")}
              ref={this.setRef.bind(this, "loginRef")}
            />
          </label>
        </div>
        <div>
          <label style={labelStyle}>
            Пароль:
            <input
              type="password"
              style={this.mayBeFocusStyle(inputStyle, "passwordRef")}
              ref={this.setRef.bind(this, "passwordRef")}
            />
          </label>
        </div>
        <div>
          <label style={labelStyle}>
            Запомнить:
            <img
              src={this.checkboxImgUrl()}
              style={this.mayBeFocusStyle(
                {
                  width: "30px",
                  height: "30px",
                  position: "absolute",
                  left: "147px",
                  top: "0px"
                },
                "inputRef"
              )}
              tabIndex={-1}
              ref={this.setRef.bind(this, "inputRef")}
            />
          </label>
        </div>
        <div>
          <label style={{ ...labelStyle, top: "-10px" }}>
            <input
              type="submit"
              value="Войти"
              style={this.mayBeFocusStyle(inputStyle, "submitRef")}
              ref={this.setRef.bind(this, "submitRef")}
            />
          </label>
        </div>
      </fieldset>
    );
  }
  setRef(name: string, elem: HTMLElement) {
    this.refArrStore.push(elem);
    this.refStore[name] = elem;
  }
  mayBeFocusStyle(style: React.CSSProperties, elemName: string) {
    if (this.refStore[elemName] === document.activeElement) {
      return {
        ...style,
        border: `3px solid ${color1}`
      };
    }
    return style;
  }
  checkboxImgUrl() {
    if (this.saveFormCheckBoxStatus) {
      return "./../forpost-app/img/baseline_check_box_black_36dp.png";
    } else {
      return "./../forpost-app/img/baseline_check_box_outline_blank_black_36dp.png";
    }
  }
  submit(e: React.FormEvent) {
    e.preventDefault();
  }
  switchVirtualKeyboard() {
    try {
      var status = stb.IsVirtualKeyboardActive();
    } catch (e) {
      console.log(e);
      status = false;
    }

    try {
      if (status) {
        stb.HideVirtualKeyboard();
      } else {
        stb.ShowVirtualKeyboard();
      }
    } catch (e) {
      console.log(e);
    }
  }
  key(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      this.navigate(e.key);
    }
    if (
      e.key === "Enter" &&
      (document.activeElement === this.refStore["loginRef"] ||
        document.activeElement === this.refStore["passwordRef"])
    ) {
      this.switchVirtualKeyboard();
    }

    if (
      e.key === "Enter" &&
      document.activeElement === this.refStore["inputRef"]
    ) {
      this.saveFormCheckBoxStatus = !this.saveFormCheckBoxStatus;
    }
    if (
      e.key === "Enter" &&
      document.activeElement === this.refStore["submitRef"]
    ) {
      let loginInput: HTMLInputElement = this.refStore["loginRef"] as any;
      let passwordInput: HTMLInputElement = this.refStore["passwordRef"] as any;
      this.props.submit(
        loginInput.value,
        passwordInput.value,
        this.saveFormCheckBoxStatus
      );
    }
    this.setState({});
  }
  navigate(key: string) {
    let dif = 0;
    if (key === "ArrowDown") {
      dif = 1;
    } else if (key === "ArrowUp") {
      dif = -1;
    }
    let index = this.refArrStore.indexOf(document.activeElement as HTMLElement);
    if (index === -1 || !this.refArrStore[index + dif]) {
      return;
    }
    this.refArrStore[index + dif].focus();
    if (
      document.activeElement === this.refStore["loginRef"] ||
      document.activeElement === this.refStore["passwordRef"]
    ) {
      try {
        this.switchVirtualKeyboard();
      } catch (e) {
        console.log(e);
      }
    }
  }
  componentDidMount() {
    this.refArrStore[0].focus();
    this.setState({});
    this.props.tryAutoLogin();
  }
}

interface IStateProps {
  error: string;
  waitLoading: boolean;
}

interface IDispatchProps {
  submit: IAuthActionCreator;
  tryAutoLogin: ItryAutoLogin;
}

const LoginFormContainer = connect<IStateProps, IDispatchProps>(
  (state: Istate) => {
    return {
      error: state.auth.error,
      waitLoading: state.auth.waitLoading
    };
  },
  dispatch =>
    bindActionCreators(
      {
        submit: auth,
        tryAutoLogin
      },
      dispatch
    )
)(LoginForm);

export default LoginFormContainer;

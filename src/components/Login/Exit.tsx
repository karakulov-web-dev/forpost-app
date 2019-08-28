import * as React from "react";
import { bodyStyle, loginFormStyle, labelStyle, fontSize1 } from "./style";
import { color1 } from "../style";
import Header from "../Header/Header";
import { parseGetParams } from "../../utilites";
import { connect } from "react-redux";
import { chageView, IChangeViewCreater } from "../../action/app";
import { bindActionCreators } from "redux";

declare var stb: any;
declare var location: any;

export const inputStyle: React.CSSProperties = {
  color: color1,
  fontSize: fontSize1,
  width: "100%"
};

interface IRefStore {
  [key: string]: HTMLElement;
}

type IProps = IDispatchProps;

class Exit extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  refArrStore: HTMLElement[] = [];
  refStore: IRefStore = {};
  render() {
    return (
      <div onKeyDown={this.key.bind(this)}>
        <Header />
        <div style={bodyStyle}>
          <div style={loginFormStyle}>
            <fieldset>
              <legend>
                <h1 style={{ color: color1, fontSize: "30px" }}>
                  Вы действительно хотите выйти?
                </h1>
              </legend>
              <label style={{ ...labelStyle, top: "-10px", marginTop: "20px" }}>
                <input
                  type="submit"
                  value="Выйти из приложения"
                  style={this.mayBeFocusStyle(inputStyle, "exitApp")}
                  ref={this.setRef.bind(this, "exitApp")}
                  onKeyDown={this.keyDownItem.bind(this)}
                />
              </label>

              <label style={{ ...labelStyle, top: "-10px" }}>
                <input
                  type="submit"
                  value="Выйти из аккаунта"
                  style={this.mayBeFocusStyle(inputStyle, "exitAcc")}
                  ref={this.setRef.bind(this, "exitAcc")}
                  onKeyDown={this.keyDownItem.bind(this)}
                />
              </label>

              <label style={{ ...labelStyle, top: "-10px" }}>
                <input
                  type="submit"
                  value="Отмена"
                  style={this.mayBeFocusStyle(inputStyle, "cancel")}
                  ref={this.setRef.bind(this, "cancel")}
                  onKeyDown={this.keyDownItem.bind(this)}
                />
              </label>
            </fieldset>
          </div>
        </div>
      </div>
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
  key(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      this.navigate(e.key);
      this.setState({});
    }
  }
  keyDownItem(e: React.KeyboardEvent) {
    if (e.key !== "Enter") {
      return false;
    }
    e.stopPropagation();
    if (this.refStore["exitApp"] === document.activeElement) {
      try {
        stb.SetVideoState(1);
      } catch (e) {
        console.log(e);
      }
      location = parseGetParams("referrer");
    } else if (this.refStore["exitAcc"] === document.activeElement) {
      try {
        stb.RDir("setenv forpost_app_profile  ");
      } catch (e) {
        localStorage.removeItem("forpost_app_profile");
        console.log(e);
      }
      this.props.chageView("/login");
    } else {
      this.props.chageView("/panel");
      console.log("cancel");
    }
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
  }
  componentDidMount() {
    this.refArrStore[0].focus();
    this.setState({});
  }
}

interface IDispatchProps {
  chageView: IChangeViewCreater;
}

export default connect<null, IDispatchProps>(
  null,
  dispatch =>
    bindActionCreators(
      {
        chageView
      },
      dispatch
    )
)(Exit);

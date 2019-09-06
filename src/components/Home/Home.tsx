import * as React from "react";
import Header from "../Header/Header";
import { AbstractHomeForm } from "../AbastrackHomeForm/AbstractHomeForm";
import LabelInputSubmit from "../LabelInputSubmit/LabelInputSubmit";
import { connect } from "react-redux";
import { chageView, IChangeViewCreater } from "../../action/app";
import { auth, IAuthActionCreator } from "../../action/auth";
import { bindActionCreators } from "redux";

declare const stb: any;
declare let location: any;

type IProp = IDispatchProps;

class Home extends React.Component<IProp> {
  private focusIndex: number = 0;
  refArrStore: HTMLElement[] = [];
  render() {
    return (
      <div>
        <Header />
        {AbstractHomeForm("Выберете действие!", this.renderContent.bind(this))}
      </div>
    );
  }
  renderContent() {
    return (
      <div onKeyDown={this.key.bind(this)}>
        <LabelInputSubmit
          focus={this.isFocus(0)}
          setRef={this.setRef.bind(this, 0)}
          onenter={this.props.chageView.bind(this, "/login")}
          value="Вход"
        />
        <LabelInputSubmit
          focus={this.isFocus(1)}
          setRef={this.setRef.bind(this, 1)}
          onenter={this.props.auth.bind(this, "s.karakulov", "123456", false)}
          value="Демо"
        />
        <LabelInputSubmit
          focus={this.isFocus(2)}
          setRef={this.setRef.bind(this, 2)}
          onenter={this.exit}
          value="Выход"
        />
      </div>
    );
  }
  exit() {
    try {
      stb.SetVideoState(1);
    } catch (e) {
      console.log(e);
    }
    location = "http://212.77.128.177/"; // parseGetParams("referrer");
  }
  isFocus(index: number) {
    return this.focusIndex === index ? true : false;
  }
  setRef(index: number, elem: HTMLElement) {
    this.refArrStore[index] = elem;
  }
  componentDidMount() {
    this.refArrStore[0].focus();
    this.forceUpdate();
  }
  key(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      this.navigate(e.key);
      this.forceUpdate();
    }
  }
  navigate(key: string) {
    let dif = 0;
    if (key === "ArrowDown") {
      dif = 1;
    } else if (key === "ArrowUp") {
      dif = -1;
    }
    if (!this.refArrStore[this.focusIndex + dif]) {
      return;
    }
    this.refArrStore[this.focusIndex + dif].focus();
    this.focusIndex = this.focusIndex + dif;
  }
}

interface IDispatchProps {
  chageView: IChangeViewCreater;
  auth: IAuthActionCreator;
}

export default connect<null, IDispatchProps>(
  null,
  dispatch =>
    bindActionCreators(
      {
        chageView,
        auth
      },
      dispatch
    )
)(Home);

import * as React from "react";
import { color1 } from "../style";
import Header from "../Header/Header";
import { parseGetParams } from "../../utilites";
import { connect } from "react-redux";
import { chageView, IChangeViewCreater } from "../../action/app";
import { bindActionCreators } from "redux";
import { AbstractHomeForm } from "../AbastrackHomeForm/AbstractHomeForm";
import LabelInputSubmit from "../LabelInputSubmit/LabelInputSubmit";

declare var stb: any;
declare var location: any;

type IProps = IDispatchProps;

class Exit extends React.Component<IProps> {
  private focusIndex: number = 0;
  constructor(props: IProps) {
    super(props);
  }
  refArrStore: HTMLElement[] = [];
  render() {
    return (
      <div onKeyDown={this.key.bind(this)}>
        <Header />
        {AbstractHomeForm(
          "Вы действительно хотите выйти?",
          this.renderContent.bind(this)
        )}
      </div>
    );
  }
  renderContent() {
    return (
      <div>
        {" "}
        <LabelInputSubmit
          focus={this.isFocus(0)}
          setRef={this.setRef.bind(this, 0)}
          onenter={this.exit}
          value="Выйти из приложения"
        />
        <LabelInputSubmit
          focus={this.isFocus(1)}
          setRef={this.setRef.bind(this, 1)}
          onenter={this.exitAcc.bind(this)}
          value="Выйти из аккаунта"
        />
        <LabelInputSubmit
          focus={this.isFocus(2)}
          setRef={this.setRef.bind(this, 2)}
          onenter={() => {
            this.props.chageView("/panel");
          }}
          value="Отмена"
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

  exitAcc() {
    try {
      stb.RDir("setenv forpost_app_profile  ");
    } catch (e) {
      localStorage.removeItem("forpost_app_profile");
      console.log(e);
    }
    this.props.chageView("/login");
  }

  setRef(index: number, elem: HTMLElement) {
    this.refArrStore[index] = elem;
  }
  isFocus(index: number) {
    return this.focusIndex === index ? true : false;
  }
  mayBeFocusStyle(style: React.CSSProperties, elemNumber: number) {
    if (this.refArrStore[elemNumber] === document.activeElement) {
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
    this.focusIndex = index + dif;
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

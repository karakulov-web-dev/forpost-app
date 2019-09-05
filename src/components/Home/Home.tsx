import * as React from "react";
import Header from "../Header/Header";
import { AbstractHomeForm } from "../AbastrackHomeForm/AbstractHomeForm";
import LabelInputSubmit from "../LabelInputSubmit/LabelInputSubmit";

export default class Home extends React.Component {
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
          onenter={() => {}}
          value="Вход"
        />
        <LabelInputSubmit
          focus={this.isFocus(1)}
          setRef={this.setRef.bind(this, 1)}
          onenter={() => {}}
          value="Демо"
        />
        <LabelInputSubmit
          focus={this.isFocus(2)}
          setRef={this.setRef.bind(this, 2)}
          onenter={() => {}}
          value="Выход"
        />
      </div>
    );
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
    console.log(this.focusIndex);
    if (!this.refArrStore[this.focusIndex + dif]) {
      return;
    }
    this.refArrStore[this.focusIndex + dif].focus();
    this.focusIndex = this.focusIndex + dif;
  }
}

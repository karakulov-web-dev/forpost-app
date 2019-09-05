import * as React from "react";
import Header from "../Header/Header";
import { AbstractHomeForm } from "../AbastrackHomeForm/AbstractHomeForm";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {AbstractHomeForm("Выберете действие!", this.renderContent.bind(this))}
      </div>
    );
  }
  renderContent() {
    return <div>hello</div>;
  }
}

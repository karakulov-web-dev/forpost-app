import * as React from "react";
import Header from "../Header/Header";
import Grid from "./Grid";

export default class Panel extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Grid />
      </div>
    );
  }
}

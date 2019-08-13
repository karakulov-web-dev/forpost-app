import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";

const global: any = window;

const store = createStore(() => {
  return {};
});
global["store"] = store;

interface Iprops {
  name: string;
}

class Hello extends React.Component<Iprops> {
  render() {
    return (
      <div style={{ color: "red", fontSize: "80px" }}>
        hello {`${this.props.name}`}
      </div>
    );
  }
  componentDidMount() {}
}

const HelloWorldContainer = connect(
  () => {
    return { name: "word" };
  },
  {}
)(Hello);

ReactDOM.render(
  <Provider store={store as any}>
    <HelloWorldContainer />
  </Provider>,
  document.getElementById("reactRoot")
);

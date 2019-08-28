import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/root";
import { Istate, IViewName } from "./state/Istate";
import Login from "./components/Login/Login";
import Panel from "./components/Panel/Panel";
import Player from "./components/Player/Player";
import Exit from "./components/Login/Exit";

const global: any = window;

const store = createStore(rootReducer, applyMiddleware(thunk));
global["store"] = store;

interface Iprops {
  view: IViewName;
}

class ViewWrap extends React.Component<Iprops> {
  render() {
    if (this.props.view === "/login") {
      return <Login />;
    } else if (this.props.view === "/panel") {
      return <Panel />;
    } else if (this.props.view === "/player") {
      return <Player />;
    } else if (this.props.view === "/exit") {
      return <Exit />;
    }
  }
}

const ViewWrapContainer = connect((state: Istate) => ({
  view: state.app.view
}))(ViewWrap);

ReactDOM.render(
  <Provider store={store as any}>
    <ViewWrapContainer />
  </Provider>,
  document.getElementById("reactRoot")
);

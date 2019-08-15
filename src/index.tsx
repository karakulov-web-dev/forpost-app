import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/root";
import { Istate } from "./state/Istate";
import Login from "./components/Login/Login";
import thunk from "redux-thunk";

const global: any = window;

const store = createStore(rootReducer, applyMiddleware(thunk));
global["store"] = store;

interface Iprops {
  view: string;
}

class ViewWrap extends React.Component<Iprops> {
  render() {
    if (this.props.view === "/login") {
      return <Login />;
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

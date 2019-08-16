import { IstateApp, IViewName } from "../state/Istate";
import { Action } from "react-redux/node_modules/redux";

let defaultState: IstateApp = {
  view: "/panel"
};

export const app = (
  state: IstateApp = defaultState,
  action: Action
): IstateApp => {
  return state;
};

function changeView(state: IstateApp, view: IViewName) {
  return { ...state, view };
}

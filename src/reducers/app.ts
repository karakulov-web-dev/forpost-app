import { IstateApp, IViewName } from "../state/Istate";
import { CHANGE_VIEW } from "../action/ACTION_TYPE_CONST";
import { IAppAnyAction } from "../action/app";

let defaultState: IstateApp = {
  view: "/login"
};

export const app = (
  state: IstateApp = defaultState,
  action: IAppAnyAction
): IstateApp => {
  if (action.type === CHANGE_VIEW) {
    return changeView(state, action.payload);
  }
  return state;
};

function changeView(state: IstateApp, view: IViewName) {
  return { ...state, view };
}

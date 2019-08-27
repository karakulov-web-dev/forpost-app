import { CHANGE_VIEW, CHANGE_VIEW_TYPE } from "./ACTION_TYPE_CONST";
import { IViewName } from "../state/Istate";

export type IAppAnyAction = IChangeView;

export interface IChangeView {
  type: CHANGE_VIEW_TYPE;
  payload: IViewName;
}

export interface IChangeViewCreater {
  (payload: IViewName): IChangeView;
}

export const chageView: IChangeViewCreater = payload => ({
  type: CHANGE_VIEW,
  payload
});

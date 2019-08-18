import { CHANGE_VIEW, CHANGE_VIEW_TYPE } from "./ACTION_TYPE_CONST";
import { IViewName } from "../state/Istate";

export type IAppAnyAction = IChangeView;

interface IChangeView {
  type: CHANGE_VIEW_TYPE;
  payload: IViewName;
}

export const chageView = (payload: IViewName): IChangeView => ({
  type: CHANGE_VIEW,
  payload
});

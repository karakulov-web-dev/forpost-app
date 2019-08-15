import { CHANGE_VIEW, CHANGE_VIEW_TYPE } from "../action/ACTION_TYPE_CONST";
import { IViewName } from "../state/Istate";

interface IChangeView {
  type: CHANGE_VIEW_TYPE;
  payload: IViewName;
}

export const chageView = (payload: IViewName): IChangeView => ({
  type: CHANGE_VIEW,
  payload
});

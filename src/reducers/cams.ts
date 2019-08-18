import { IstateCams } from "../state/Istate";
import { ICamsAnyAction, ICamsChangeStateAction } from "../action/cam";
import { CHANGE_CAMS_STATE } from "../action/ACTION_TYPE_CONST";

const defaultState: IstateCams = {
  items: [],
  gridActiveItemPosition: 0,
  gridMaxItems: 5,
  grigPage: 0,
  gridLoading: false
};

export const cams = (
  state: IstateCams = defaultState,
  action: ICamsAnyAction
) => {
  if (action.type === CHANGE_CAMS_STATE) {
    state = changeCamsState(state, action);
  }
  return state;
};

const changeCamsState = (
  state: IstateCams,
  action: ICamsChangeStateAction
): IstateCams => {
  return {
    ...state,
    ...action.payload
  };
};

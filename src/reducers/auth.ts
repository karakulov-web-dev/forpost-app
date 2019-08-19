import { IstateAuth } from "../state/Istate";
import { IAuthAnyAction, IAuthSuccessPayload } from "../action/auth";
import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOADING
} from "../action/ACTION_TYPE_CONST";

let defaultState: IstateAuth = {
  login: "",
  password: "",
  save: false,
  error: "",
  SessionID: "",
  waitLoading: false
};
export const auth = (
  state: IstateAuth = defaultState,
  action: IAuthAnyAction
) => {
  if (action.type === AUTH_ERROR) {
    return auth_error(state, action.payload);
  }
  if (action.type === AUTH_SUCCESS) {
    return auth_success(state, { ...action.payload });
  }
  if (action.type === AUTH_LOADING) {
    return auth_loading(state, action.payload);
  }
  return state;
};

function auth_error(state: IstateAuth, error: string): IstateAuth {
  return { ...state, error };
}
function auth_success(
  state: IstateAuth,
  payload: IAuthSuccessPayload
): IstateAuth {
  return {
    ...state,
    ...payload,
    error: ""
  };
}
function auth_loading(state: IstateAuth, waitLoading: boolean) {
  return { ...state, waitLoading };
}

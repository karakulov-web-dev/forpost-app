import { IstateAuth } from "../state/Istate";
import { IAuthAnyAction, IAuthSuccessPayload } from "../action/auth";
import { AUTH_ERROR, AUTH_SUCCESS } from "../action/ACTION_TYPE_CONST";

let defaultState: IstateAuth = {
  login: "",
  password: "",
  save: false,
  error: "",
  SessionID: "ehfp50u4d04husbratlk9bsjf2"
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

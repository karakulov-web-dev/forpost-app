import { IAction } from "./action";
import { SelfGuidedGenerator } from "../utilites";
import { httpAutReq, IHttpAuthResult } from "../HTTP";
import {
  AUTH_ERROR,
  AUTH_ERROR_TYPE,
  AUTH_SUCCESS,
  AUTH_SUCCESS_TYPE
} from "./ACTION_TYPE_CONST";
import { chageView } from "./app";

interface IAuthErrorAction {
  type: AUTH_ERROR_TYPE;
  payload: string;
}

const authError = (payload: string): IAuthErrorAction => ({
  type: AUTH_ERROR,
  payload
});

export interface IAuthSuccess {
  type: AUTH_SUCCESS_TYPE;
  payload: IAuthSuccessPayload;
}
export interface IAuthSuccessPayload {
  SessionID: string;
  login: string;
  password: string;
  save: boolean;
}

const authSuccess = (
  SessionID: string,
  login: string,
  password: string,
  save: boolean
): IAuthSuccess => {
  return {
    type: AUTH_SUCCESS,
    payload: {
      SessionID,
      login,
      password,
      save
    }
  };
};

export type IAuthAnyAction = IAuthErrorAction | IAuthSuccess;

export interface IAuthActionCreator {
  (login: string, password: string, save: boolean): IAction;
}

export const auth: IAuthActionCreator = (login, password, save) => (
  dispath,
  getState
) => {
  new SelfGuidedGenerator(function*(self) {
    dispath(authError(""));
    let data: IHttpAuthResult = yield httpAutReq(
      login,
      password,
      self.next.bind(self)
    );
    if (data.Error) {
      dispath(authError(data.Error));
      return;
    }
    dispath(authSuccess(data.SessionID, login, password, save));
    dispath(chageView("/panel"));
  });
};

import { IAction } from "./action";
import { SelfGuidedGenerator, delay } from "../utilites";
import { httpAutReq, IHttpAuthResult } from "../HTTP";
import {
  AUTH_ERROR,
  AUTH_ERROR_TYPE,
  AUTH_SUCCESS,
  AUTH_SUCCESS_TYPE,
  AUTH_LOADING_TYPE,
  AUTH_LOADING
} from "./ACTION_TYPE_CONST";
import { chageView } from "./app";

declare var stb: any;

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

export interface IAuthLoadingAction {
  type: AUTH_LOADING_TYPE;
  payload: boolean;
}

const authLoading = (payload: boolean): IAuthLoadingAction => ({
  type: "AUTH_LOADING",
  payload
});

export type IAuthAnyAction =
  | IAuthErrorAction
  | IAuthSuccess
  | IAuthLoadingAction;

export interface IAuthActionCreator {
  (login: string, password: string, save: boolean): IAction;
}

export const auth: IAuthActionCreator = (login, password, save) => (
  dispath,
  getState
) => {
  new SelfGuidedGenerator(function*(self) {
    dispath(authError(""));
    dispath(authLoading(true));
    let data: IHttpAuthResult = yield httpAutReq(
      login,
      password,
      self.next.bind(self)
    );
    yield delay(1000, self.next.bind(self));
    dispath(authLoading(false));
    if (data.Error) {
      dispath(authError(data.Error));
      return;
    }

    dispath(authSuccess(data.SessionID, login, password, save));
    dispath(chageView("/panel"));

    if (save) {
      let profileJson: string = JSON.stringify({
        login,
        password
      });
      try {
        stb.RDir(`setenv forpost_app_profile ${profileJson}`);
      } catch (e) {
        localStorage.setItem("forpost_app_profile", profileJson);
        console.log(e);
      }
    }
  });
};

export interface ItryAutoLogin {
  (): IAction;
}

interface IforpostAppProfile {
  login: string;
  password: string;
}

export const tryAutoLogin: ItryAutoLogin = () => (dispath, getState) => {
  var profile: IforpostAppProfile;
  let profileJson: string;

  try {
    profileJson = stb.RDir("getenv forpost_app_profile");
  } catch (e) {
    profileJson = localStorage.getItem("forpost_app_profile");
    console.log(e);
  }
  if (profileJson) {
    profile = JSON.parse(profileJson);
  } else {
    return;
  }

  dispath(auth(profile.login, profile.password, false));
};

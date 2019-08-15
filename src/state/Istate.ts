export interface Istate {
  app: IstateApp;
  auth: IstateAuth;
}

export interface IstateApp {
  view: IViewName;
}
export interface IstateAuth {
  login: string;
  password: string;
  save: boolean;
  error: string;
  SessionID: string;
}

export type IViewName = "/login" | "/panel";

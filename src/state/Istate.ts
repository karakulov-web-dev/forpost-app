export interface Istate {
  app: IstateApp;
  auth: IstateAuth;
}
export interface IstateApp {
  view: string;
}
export interface IstateAuth {
  login: string;
  password: string;
  save: string;
  error: string;
}

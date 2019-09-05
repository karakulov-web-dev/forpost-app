export interface Istate {
  app: IstateApp;
  auth: IstateAuth;
  cams: IstateCams;
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
  waitLoading: boolean;
}
export interface IstateCams {
  items: ICam[];
  gridActiveItemPosition: number;
  gridMaxItems: number;
  grigPage: number;
  gridLoading: boolean;
  currentPlay: ICam | undefined;
}
export interface ICam {
  CameraID: number;
  Name: string;
  AccountObjectID: number;
  AccountObjectName: string;
  PTZ: number;
  Sound: number;
  Quota: string;
  PermanentRecord: number;
  Address: string;
  HomeModeAccess: number;
  HomeMode: number;
  IsRecord: number | string;
  Lat: number;
  Lon: number;
}

export type IViewName = "/login" | "/exit" | "/home" | "/panel" | "/player";

declare var stb: any;

let apiHost =
  stb.__type__ === "mag" ? "http://cam.rikt.ru" : "http://cam.rikt.ru";

interface IHttpAuthReq {
  (login: string, password: string, cb: IHttpAuthCb): void;
}

export interface IHttpAuthCb {
  (data: IHttpAuthResult): void;
}

export interface IHttpAuthResult {
  SessionID: string;
  Error: string;
}
export const httpAutReq: IHttpAuthReq = (
  login: string,
  password: string,
  cb: IHttpAuthCb
) => {
  var data = `Login=${login}&Password=${password}`;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", `${apiHost}/api/login`, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);

  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState === 4) {
      cb(JSON.parse(xhr.responseText));
    }
  });
};

interface IHttpGetTranslation {
  (
    SessionID: string,
    CameraID: number,
    Format: string,
    cb: IHttpGetTranslationCb
  ): void;
}

export interface IHttpGetTranslationCb {
  (data: IHttpGetTranslationResult): void;
}

export interface IHttpGetTranslationResult {
  URL: string;
  Error: string;
}

export const httpGetTranslation: IHttpGetTranslation = (
  SessionID,
  CameraID,
  Format,
  cb
) => {
  var data = `SessionID=${SessionID}&CameraID=${CameraID}&Format=${Format}`;

  var xhr = new XMLHttpRequest();

  xhr.open("POST", `${apiHost}/api/GetTranslationURL`, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.send(data);

  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState === 4) {
      cb(JSON.parse(xhr.responseText));
    }
  });
};

interface IHttpStopTranslationCb {
  (): void;
}
interface IHttpStopTranslation {
  (URL: string, cb: IHttpStopTranslationCb): void;
}

export const httpStopTranslation: IHttpStopTranslation = (URL, cb) => {
  var data = "op=stop";

  var xhr = new XMLHttpRequest();

  xhr.open("POST", URL, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);

  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState === 4) {
      cb();
    }
  });
};

interface IHttpGetCameras {
  (SessionID: string, cb: IGetCamerasCb): void;
}

interface IGetCamerasCb {
  (data: IGetCamerasResult): void;
}

export type IGetCamerasResult = IGetCamerasItem[];

interface IGetCamerasItem {
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

export const getCameras: IHttpGetCameras = (SessionID, cb) => {
  var data = `SessionID=${SessionID}&ActiveOnly=1`;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", `${apiHost}/api/GetCameras`);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);
  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState === 4) {
      cb(JSON.parse(xhr.responseText));
    }
  });
};

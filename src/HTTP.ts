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
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState === 4) {
      cb(JSON.parse(xhr.responseText));
    }
  });

  xhr.open("POST", "http://cam.rikt.ru/api/login");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.send(data);
};

interface Icb {
  (s: string): void;
}

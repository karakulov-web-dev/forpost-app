import { IstateCams } from "../state/Istate";
import { Action } from "react-redux/node_modules/redux";

const defaultState: IstateCams = {
  items: [
    {
      CameraID: 4900,
      Name: "Гора Югус",
      AccountObjectID: 0,
      AccountObjectName: "",
      PTZ: 0,
      Sound: 0,
      Quota: "604800",
      PermanentRecord: 1,
      Address: "Междуреченск Гора Югус",
      HomeModeAccess: 0,
      HomeMode: 0,
      IsRecord: "1",
      Lat: 53.6563132,
      Lon: 88.0871814
    },
    {
      CameraID: 4900,
      Name: "Гора Югус",
      AccountObjectID: 0,
      AccountObjectName: "",
      PTZ: 0,
      Sound: 0,
      Quota: "604800",
      PermanentRecord: 1,
      Address: "Междуреченск Гора Югус",
      HomeModeAccess: 0,
      HomeMode: 0,
      IsRecord: "1",
      Lat: 53.6563132,
      Lon: 88.0871814
    },
    {
      CameraID: 4900,
      Name: "Гора Югус",
      AccountObjectID: 0,
      AccountObjectName: "",
      PTZ: 0,
      Sound: 0,
      Quota: "604800",
      PermanentRecord: 1,
      Address: "Междуреченск Гора Югус",
      HomeModeAccess: 0,
      HomeMode: 0,
      IsRecord: "1",
      Lat: 53.6563132,
      Lon: 88.0871814
    },
    {
      CameraID: 4900,
      Name: "Гора Югус",
      AccountObjectID: 0,
      AccountObjectName: "",
      PTZ: 0,
      Sound: 0,
      Quota: "604800",
      PermanentRecord: 1,
      Address: "Междуреченск Гора Югус",
      HomeModeAccess: 0,
      HomeMode: 0,
      IsRecord: "1",
      Lat: 53.6563132,
      Lon: 88.0871814
    }
  ],
  gridActiveItemPosition: 0,
  gridMaxItems: 4,
  grigPage: 0,
  gridLoading: false
};

export const cams = (state: IstateCams = defaultState, action: Action) => {
  return state;
};

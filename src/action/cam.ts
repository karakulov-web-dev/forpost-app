import { CHANGE_CAMS_STATE_TYPE, CHANGE_CAMS_STATE } from "./ACTION_TYPE_CONST";
import { ICam } from "../state/Istate";
import { IAction } from "./action";
import { SelfGuidedGenerator, delay } from "../utilites";
import { getCameras, IGetCamerasResult } from "../HTTP";

export type ICamsAnyAction = ICamsChangeStateAction;

export interface ICamsChangeStateAction {
  type: CHANGE_CAMS_STATE_TYPE;
  payload: IChangeStateActionPayload;
}

interface IChangeStateActionPayload {
  items?: ICam[];
  gridActiveItemPosition?: number;
  gridMaxItems?: number;
  grigPage?: number;
  gridLoading?: boolean;
}

export interface IChangeStateCamsActionCreator {
  (payload: IChangeStateActionPayload): ICamsAnyAction;
}
export const changeStateCams: IChangeStateCamsActionCreator = payload => ({
  type: CHANGE_CAMS_STATE,
  payload
});

export interface IloadCamItems {
  (): IAction;
}

export const loadCamItems: IloadCamItems = () => (dispatch, getState) => {
  new SelfGuidedGenerator(function*(gen) {
    const { auth } = getState();
    if (!auth.SessionID) {
      return;
    }
    let items: IGetCamerasResult = yield getCameras(
      auth.SessionID,
      gen.next.bind(gen)
    );
    dispatch(
      changeStateCams({
        gridLoading: false,
        items
      })
    );
  });
};

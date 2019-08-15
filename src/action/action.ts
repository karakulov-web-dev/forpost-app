import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Istate } from "../state/Istate";

export type IAction = Action | ThunkAction<any, Istate, any, any>;

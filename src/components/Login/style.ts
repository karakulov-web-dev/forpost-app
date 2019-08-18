import * as React from "react";
import {
  color1,
  abstracktStyleFullWidhtElem,
  fontSize1 as fontSize,
  fontFamily1 as fontFamily
} from "../style";

export const colorError = "#b00020";
export const fontSize1 = fontSize;
export const fontFamily1 = fontFamily;

export const bodyStyle: React.CSSProperties = {
  ...abstracktStyleFullWidhtElem,
  height: "100%",
  top: "100px",
  bottom: "0px",
  background: "url(./../forpost-app/img/background1.png) no-repeat"
};

export const loginFormStyle: React.CSSProperties = {
  maxWidth: "520px",
  padding: "19px 29px 50px",
  margin: "0 auto 20px",
  backgroundColor: "#fff",
  border: "4px solid #e5e5e5",
  borderRadius: "5px",
  boxShadow: "0 1px 2px rgba(0, 0, 0, .05)",
  marginTop: "60px",
  marginBottom: "100px"
};

export const labelStyle: React.CSSProperties = {
  color: color1,
  display: "block",
  marginBottom: "25px",
  fontSize: "25px",
  position: "relative"
};

export const inputStyle: React.CSSProperties = {
  color: color1,
  fontSize: fontSize1,
  position: "absolute",
  right: "0px"
};

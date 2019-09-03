import * as React from "react";
import {
  color1,
  abstracktStyleFullWidhtElem,
  fontSize1 as fontSize,
  fontFamily1 as fontFamily,
  color5,
  color10,
  color11
} from "../style";

declare var stb: any;

export const colorError = color11;
export const fontSize1 = fontSize;
export const fontFamily1 = fontFamily;

let bodyStyle: React.CSSProperties = {
  ...abstracktStyleFullWidhtElem,
  height: "75%",
  top: "100px",
  bottom: "0px",
  background: "url(./../forpost-app/img/background1.png) no-repeat",
  borderBottom: `100px solid ${color1}`
};

export { bodyStyle };

export const loginFormStyle: React.CSSProperties = {
  maxWidth: "520px",
  padding: "19px 29px 50px",
  margin: "0 auto 20px",
  backgroundColor: color5,
  border: `4px solid ${color10}`,
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

let inputStyle: React.CSSProperties = {
  color: color1,
  fontSize: fontSize1,
  position: "absolute",
  right: "0px"
};

if (stb.__type__ === "tvip") {
  inputStyle.border = "2px solid buttonface";
}

export { inputStyle };

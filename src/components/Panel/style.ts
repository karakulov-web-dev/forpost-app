import { color2, fontFamily1, fontSize1, color6 } from "../style";

declare var stb: any;

const paddingLeft = stb.__type__ === "mag" ? "80px" : "50px";
const paddingRight = stb.__type__ === "mag" ? "80px" : "50px";
export const gridStyle: React.CSSProperties = {
  top: "100px",
  left: "0px",
  right: "0px",
  bottom: "0px",
  position: "absolute",
  background: color6,
  paddingLeft,
  paddingRight
};

export const noItemsMessageStyle: React.CSSProperties = {
  color: color2,
  fontFamily: fontFamily1,
  fontSize: fontSize1,
  position: "relative",
  top: "20px",
  left: "100px"
};

export const loadingStyle: React.CSSProperties = {
  position: "relative",
  display: "block",
  margin: "auto",
  marginTop: "20%"
};

const left = stb.__type__ === "mag" ? "30px" : "0px";
const right = stb.__type__ === "mag" ? "30px" : "0px";
export const arrowRStyle: React.CSSProperties = {
  display: "block",
  position: "absolute",
  right,
  top: "46%"
};
export const arrowLStyle: React.CSSProperties = {
  display: "block",
  position: "absolute",
  left,
  top: "46%"
};

import { color2, fontFamily1, fontSize1 } from "../style";

export const gridStyle: React.CSSProperties = {
  top: "100px",
  left: "0px",
  right: "0px",
  bottom: "0px",
  position: "absolute",
  background: "#212121",
  paddingLeft: "50px",
  paddingRight: "50px"
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

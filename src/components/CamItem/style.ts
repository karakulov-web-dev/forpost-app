import {
  fontSize1,
  fontFamily1,
  color1,
  color2 as _color2,
  imgLoadingStyle as _imgLoadingStyle
} from "../style";

export const color2 = _color2;
export const color3 = "#383838";

export const camItemStyle: React.CSSProperties = {
  background: color3,
  border: "2px solid black",
  borderRadius: "4px",
  top: "10px",
  left: "10px",
  right: "10px",
  bottom: "10px",
  position: "absolute"
};

export const camItemActiveStyle: React.CSSProperties = {
  ...camItemStyle,
  background: color2
};

export const nameStyle: React.CSSProperties = {
  position: "absolute",
  left: "20px",
  right: "0px",
  bottom: "0px",
  color: color2,
  fontSize: fontSize1,
  fontFamily: fontFamily1,
  marginBottom: "15px"
};

export const nameActiveStyle: React.CSSProperties = {
  ...nameStyle,
  color: color1
};

export const camBodyStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  left: "10px",
  right: "10px",
  bottom: "60px"
};

export const imgWrapStyle: React.CSSProperties = {
  position: "absolute",
  top: "0px",
  left: "0px",
  right: "0px",
  bottom: "0px"
};

export const imgCamStyle: React.CSSProperties = {
  maxHeight: "100%",
  maxWidth: "100%",
  margin: "0 auto"
};

export const imgLoadingStyle = _imgLoadingStyle;

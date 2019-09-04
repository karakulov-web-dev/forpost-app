import {
  imgLoadingStyle as _imgLoadingStyle,
  fontFamily1 as fontFamily,
  fontSize1 as fontSize,
  color3,
  color4,
  color7,
  color8,
  color1,
  color2,
  fontFamily1
} from "../style";

const fullScreenStyle: React.CSSProperties = {
  position: "absolute",
  top: "0px",
  left: "0px",
  right: "0px",
  bottom: "0px",
  height: "100%",
  width: "100%"
};

export const style: React.CSSProperties = {
  ...fullScreenStyle
};

export const imgLoadingStyle = _imgLoadingStyle;

export const playerBodyStyle: React.CSSProperties = {
  ...fullScreenStyle
};

export const controlPanelStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "0px",
  left: "0px",
  right: "0px",
  height: "120px",
  background: "url(./../forpost-app/img/layerControlBg.png)",
  backgroundRepeat: "repeat-x"
};

export const playerButtonsStyle: React.CSSProperties = {
  borderBottom: `2px solid ${color3}`,
  position: "absolute",
  top: "0px",
  left: "0px",
  right: "0px",
  height: "55px"
};

export const timeBarStyle: React.CSSProperties = {
  position: "absolute",
  left: "120px",
  top: "10px",
  display: "block",
  color: color4,
  fontFamily,
  fontSize
};

export const progressBarStyle: React.CSSProperties = {
  position: "absolute",
  top: "55px",
  left: "0px",
  right: "0px",
  bottom: "0px"
};

export const progressBarStyleLine: React.CSSProperties = {
  position: "absolute",
  top: "25px",
  left: "70px",
  right: "70px",
  height: "10px",
  background: color4
};

export const timeStepSizeStyle: React.CSSProperties = {
  position: "absolute",
  left: "400px",
  width: "120px",
  height: "50px"
};
export const timeStepSizeImgUp: React.CSSProperties = {
  position: "absolute",
  top: "0px"
};
export const timeStepSizeImgDown: React.CSSProperties = {
  position: "absolute",
  top: "12px"
};
export const timeStepSizeImgValue: React.CSSProperties = {
  position: "absolute",
  left: "40px",
  top: "10px",
  width: "100px",
  color: color4,
  fontFamily,
  fontSize
};

export const playPauseButtonStyle: React.CSSProperties = {
  position: "absolute",
  left: "60px",
  top: "6px",
  display: "block"
};

export const progressBarCursor: React.CSSProperties = {
  display: "block",
  height: "30px",
  width: "30px",
  position: "absolute",
  background: color7,
  borderRadius: "30px",
  bottom: "-11px"
};
export const progressBarCursorBody: React.CSSProperties = {
  width: "12px",
  height: " 12px",
  background: color8,
  margin: "9px",
  borderRadius: "9px"
};

export const timeBarModalItemStyle: React.CSSProperties = {
  width: "98%",
  padding: "15px",
  fontSize: "20px",
  color: color1,
  fontFamily: fontFamily1,
  marginLeft: "1%",
  marginRight: "1%",
  marginTop: "5px",
  marginBottom: "5px"
};

export const timeBarModalStyle: React.CSSProperties = {
  position: "fixed",
  left: "300px",
  right: "300px",
  top: "150px",
  height: "280px",
  background: "white",
  border: `1px solid ${color2}`,
  borderRadius: "4px",
  color: color1,
  fontFamily: fontFamily1
};

export const timeBarModalHeader: React.CSSProperties = {
  display: "block",
  fontSize: "30px",
  margin: "0 auto",
  padding: "10px",
  borderBottom: `1px solid ${color2}`
};

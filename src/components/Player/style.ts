import { imgLoadingStyle as _imgLoadingStyle } from "../style";

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
  borderBottom: "2px solid #6A6A6A",
  position: "absolute",
  top: "0px",
  left: "0px",
  right: "0px",
  height: "50px"
};

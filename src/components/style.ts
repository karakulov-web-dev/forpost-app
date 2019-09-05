declare const stb: any;

export const color1 = "#333";
export const color2 = "#aaa";
export const color3 = "#6A6A6A";
export const color4 = "white";
export const color5 = "#fff";
export const color6 = "#212121";
export const color7 = "#e2e2e2";
export const color8 = "#ccc";
export const color9 = "#383838";
export const color10 = "#e5e5e5";
export const color11 = "#b00020";
export const fontSize1 = "25px";
export const fontFamily1 = '"Open Sans", "Lato", sans-serif';

export const abstracktStyleFullWidhtElem: React.CSSProperties = {
  position: "fixed",
  width: "100%",
  left: "0px",
  right: "0px"
};

export const imgLoadingStyle: React.CSSProperties = {
  margin: "0 auto",
  position: "absolute",
  top: "35%",
  left: "47%"
};

export const bodyStyle: React.CSSProperties = {
  ...abstracktStyleFullWidhtElem,
  height: "75%",
  top: "100px",
  bottom: "0px",
  background: "url(./../forpost-app/img/background1.png) no-repeat",
  borderBottom: `100px solid ${color1}`
};

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

export const inputStyleForm: React.CSSProperties = {
  color: color1,
  fontSize: fontSize1,
  width: "100%"
};

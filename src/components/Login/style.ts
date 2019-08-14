import * as React from "react";

export const color1 = "#333";
export const colorError = "#b00020";
export const fontSize1 = "25px";
export const fontFamily1 = '"Open Sans", "Lato", sans-serif';

const abstracktStyleFullWidhtElem: React.CSSProperties = {
  position: "fixed",
  width: "100%",
  left: "0px",
  right: "0px"
};
export const headerStyle: React.CSSProperties = {
  ...abstracktStyleFullWidhtElem,
  height: "100px",
  top: "0px",
  background: color1
};
export const bodyStyle: React.CSSProperties = {
  ...abstracktStyleFullWidhtElem,
  height: "100%",
  top: "100px",
  bottom: "0px",
  background: "url(./../forpost-app/img/background1.png) no-repeat"
};
export const logoStyle: React.CSSProperties = {
  height: "60px",
  top: "25px",
  left: "100px",
  position: "absolute"
};
export const nameAppStyle: React.CSSProperties = {
  fontFamily: '"Open Sans", "Lato", sans-serif',
  fontSize: "32px",
  color: "#fff",
  top: "30px",
  left: "180px",
  position: "absolute"
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

import * as React from "react";
import { abstracktStyleFullWidhtElem, color1, color5 } from "../style";

export const headerStyle: React.CSSProperties = {
  ...abstracktStyleFullWidhtElem,
  height: "100px",
  top: "0px",
  background: color1
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
  color: color5,
  top: "30px",
  left: "180px",
  position: "absolute"
};

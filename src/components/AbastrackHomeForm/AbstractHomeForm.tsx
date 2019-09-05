import * as React from "react";
import { bodyStyle, loginFormStyle, color1 } from "./style";

interface IrenderFunction {
  (): JSX.Element;
}

export const AbstractHomeForm = (
  name: string,
  renderFunction: IrenderFunction
) => (
  <div style={bodyStyle}>
    <div style={loginFormStyle}>
      <fieldset>
        <legend>
          <h1 style={{ color: color1, fontSize: "30px" }}>{name}</h1>
        </legend>
        {renderFunction()}
      </fieldset>
    </div>
  </div>
);

import * as React from "react";
import { labelStyle, color1, inputStyle } from "./style";

interface IProps {
  focus: boolean;
  setRef: IsetRef;
  onenter: Ienter;
  value: string;
}
interface IsetRef {
  (elem: HTMLElement): void;
}
interface Ienter {
  (): void;
}

export default class LabelInputSubmit extends React.Component<IProps> {
  private elem: HTMLElement;
  render() {
    return (
      <label style={{ ...labelStyle, top: "-10px" }}>
        <input
          type="submit"
          value="Выйти из приложения"
          style={this.mayBeFocusStyle(inputStyle)}
          ref={this.setRef.bind(this)}
          onKeyDown={this.key.bind(this)}
          tabIndex={1}
        />
      </label>
    );
  }
  mayBeFocusStyle(style: React.CSSProperties) {
    if (this.props.focus) {
      return {
        ...style,
        border: `3px solid ${color1}`
      };
    }
    return style;
  }
  setRef(elem: HTMLElement) {
    this.props.setRef(elem);
    this.elem = elem;
  }
  key(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      this.props.onenter();
    }
  }
  shouldComponentUpdate(nextProps: IProps) {
    if (this.props.focus !== nextProps.focus) {
      return true;
    } else {
      return false;
    }
  }
  componentDidUpdate() {
    if (this.props.focus) {
      this.elem.focus();
    }
  }
}

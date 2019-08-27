import * as React from "react";
import { IPropBodyComponent } from "./Player";
import { playerBodyStyle } from "./style";
import ControlPanel from "./ControlPanel";

declare var stb: any;

export default class PlayerBody extends React.Component<IPropBodyComponent> {
  private elem: HTMLElement;
  constructor(props: IPropBodyComponent) {
    super(props);
  }
  render() {
    return (
      <div
        tabIndex={1}
        ref={this.setElem.bind(this)}
        onKeyDown={this.key.bind(this)}
        style={playerBodyStyle}
      >
        <ControlPanel />
      </div>
    );
  }
  componentDidMount() {
    this.elem.focus();
  }
  setElem(elem: HTMLElement) {
    this.elem = elem;
  }
  key(e: React.KeyboardEvent) {
    console.log(e.key);
    if (e.key === "Backspace" || e.key === "Escape") {
      this.props.chageView("/panel");
      try {
        stb.Stop();
      } catch (e) {
        console.log(e);
      }
    }
  }
}

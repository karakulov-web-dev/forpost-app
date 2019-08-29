import * as React from "react";
import { IPropBodyComponent } from "./Player";
import { playerBodyStyle } from "./style";
import ControlPanel from "./ControlPanel";

declare var stb: any;

interface IState {
  panelVisible: boolean;
}

export default class PlayerBody extends React.Component<
  IPropBodyComponent,
  IState
> {
  private elem: HTMLElement;
  private controlPanelStatus: ControlPanelStatusChanger;
  constructor(props: IPropBodyComponent) {
    super(props);
    this.state = {
      panelVisible: true
    };
    this.controlPanelStatus = new ControlPanelStatusChanger(this);
  }
  render() {
    return (
      <div
        tabIndex={1}
        ref={this.setElem.bind(this)}
        onKeyDown={this.key.bind(this)}
        style={playerBodyStyle}
      >
        {this.controlPanel()}
      </div>
    );
  }
  componentDidMount() {
    this.elem.focus();
    this.controlPanelStatus.show();
  }
  setElem(elem: HTMLElement) {
    this.elem = elem;
  }
  key(e: React.KeyboardEvent) {
    console.log(e.keyCode);

    this.controlPanelStatus.show();
    if (e.key === "Backspace" || e.key === "Escape") {
      this.props.chageView("/panel");
      try {
        stb.Stop();
      } catch (e) {
        console.log(e);
      }
    }

    if (e.keyCode === 82 && this.props.playerState.playStatus) {
      this.props.playerChangeState({
        ...this.props.playerState,
        playStatus: false
      });
      try {
        stb.Pause();
      } catch (e) {
        console.log(e);
      }
    } else if (e.keyCode === 82 && !this.props.playerState.playStatus) {
      this.props.playerChangeState({
        ...this.props.playerState,
        playStatus: true
      });
      try {
        stb.Continue();
      } catch (e) {
        console.log(e);
      }
    }
  }
  controlPanel() {
    return this.state.panelVisible ? (
      <ControlPanel playStatus={this.props.playerState.playStatus} />
    ) : null;
  }
}

class ControlPanelStatusChanger {
  private player: PlayerBody;
  private timeoutId: number;
  public panelAlwaysShow: boolean = false;
  constructor(playerBody: PlayerBody) {
    this.player = playerBody;
  }
  show() {
    if (!this.player.state.panelVisible) {
      this.player.setState({ ...this.player.state, panelVisible: true });
    }
    if (!this.panelAlwaysShow) {
      this.visibleTimeout(10000);
    }
  }
  hide() {
    if (!this.panelAlwaysShow) {
      this.player.setState({ ...this.player.state, panelVisible: false });
    }
  }
  visibleTimeout(ms: number) {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.hide.bind(this), ms);
  }
}

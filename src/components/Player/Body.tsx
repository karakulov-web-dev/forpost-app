import * as React from "react";
import { IPropBodyComponent } from "./Player";
import { playerBodyStyle } from "./style";
import ControlPanel from "./ControlPanel";

declare var stb: any;

interface IState {
  panelVisible: boolean;
  time: number;
}

export default class PlayerBody extends React.Component<
  IPropBodyComponent,
  IState
> {
  private elem: HTMLElement;
  private controlPanelStatus: ControlPanelStatusChanger;
  private timeController: TimeController;
  constructor(props: IPropBodyComponent) {
    super(props);
    this.timeController = new TimeController(this);
    this.state = {
      panelVisible: true,
      time: this.timeController.getTime()
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
        {this.state.time}
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

    if (e.keyCode === 37) {
      this.timeController.changeTimeshift(-1000);
    }
    if (e.keyCode === 39) {
      this.timeController.changeTimeshift(1000);
    }

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
  private timeoutId: number;
  public panelAlwaysShow: boolean = false;
  constructor(private player: PlayerBody) {}
  show() {
    console.log(this.player.state.panelVisible);
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

class TimeController {
  private intervalId: number;
  private timeshift: number;
  private changeTimechiftTimeout: number;
  constructor(private player: PlayerBody) {
    this.intervalId = setInterval(this.pushTime.bind(this), 1000);
    this.timeshift = 0;
  }
  pushTime() {
    this.player.setState({ ...this.player.state, time: this.getTime() });
  }
  clearAllTimers() {
    clearInterval(this.intervalId);
  }
  getTime() {
    return Date.now() + this.timeshift;
  }
  changeTimeshift(dif: number) {
    let curTime = Date.now();
    if (curTime + this.timeshift + dif > curTime) {
      return;
    }
    this.timeshift = this.timeshift + dif;
    this.pushTime();
    this.onChangeTimeshift();
  }
  onChangeTimeshift() {
    clearTimeout(this.changeTimechiftTimeout);
    this.changeTimechiftTimeout = setTimeout(() => {
      console.log("onChangeTimeshift");
    }, 10000);
  }
}

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
  private timeController: TimeController;
  constructor(props: IPropBodyComponent) {
    super(props);
    this.timeController = new TimeController(
      this.props.pushTime,
      this.props.play,
      this.props.playerState.time
    );
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
  componentWillUnmount() {
    this.timeController.clearAllTimers();
    this.controlPanelStatus.clearTimeout();
  }
  setElem(elem: HTMLElement) {
    this.elem = elem;
  }
  key(e: React.KeyboardEvent) {
    console.log(e.keyCode);

    if (e.keyCode === 37) {
      this.timeController.changeTimeshift(-10000);
    }
    if (e.keyCode === 39) {
      this.timeController.changeTimeshift(10000);
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
      this.controlPanelStatus.panelAlwaysShow = true;
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
      this.controlPanelStatus.panelAlwaysShow = false;
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
      <ControlPanel
        playStatus={this.props.playerState.playStatus}
        time={this.props.playerState.time}
      />
    ) : null;
  }
}

class ControlPanelStatusChanger {
  private timeoutId: number;
  public panelAlwaysShow: boolean = false;
  constructor(private player: PlayerBody) {}
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
    this.clearTimeout();
    this.timeoutId = setTimeout(this.hide.bind(this), ms);
  }
  clearTimeout() {
    clearTimeout(this.timeoutId);
  }
}

interface IPushTimeCb {
  (time: number): void;
}

interface IChangeTimeShiftCb {
  (time: number): void;
}

class TimeController {
  private intervalId: number;
  private timeshift: number;
  private changeTimechiftTimeout: number;
  constructor(
    private _pushTime: IPushTimeCb,
    private _changeTimeShift: IChangeTimeShiftCb,
    startTime: number = Date.now()
  ) {
    this.intervalId = setInterval(this.pushTime.bind(this), 1000);
    this.timeshift = startTime - Date.now();
  }
  pushTime() {
    this._pushTime(this.getTime());
  }
  clearAllTimers() {
    clearInterval(this.intervalId);
    clearTimeout(this.changeTimechiftTimeout);
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
      this._changeTimeShift(this.getTime());
    }, 6000);
  }
}

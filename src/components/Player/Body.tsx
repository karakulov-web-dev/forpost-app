import * as React from "react";
import { IPropBodyComponent } from "./Player";
import { playerBodyStyle } from "./style";
import ControlPanel from "./ControlPanel";

declare var stb: any;

interface IState {
  panelVisible: boolean;
}

export interface IchangeTimeshift {
  (diff: number): void;
}

export interface IplayPause {
  (): void;
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
    if (e.keyCode === 37) {
      this.timeController.changeTimeshift(-this.props.playerState.timeStepSize);
    }
    if (e.keyCode === 39) {
      this.timeController.changeTimeshift(this.props.playerState.timeStepSize);
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

    if (e.keyCode === 82) {
      this.playPause();
    }
  }

  playPause() {
    let { playStatus } = this.props.playerState;

    if (playStatus) {
      this.controlPanelStatus.panelAlwaysShow = true;
      playStatus = false;
    } else if (!playStatus) {
      this.controlPanelStatus.panelAlwaysShow = false;
      playStatus = true;
    }

    try {
      if (playStatus) {
        stb.Continue();
      } else {
        stb.Pause();
      }
    } catch (e) {
      console.log(e);
    }

    if (playStatus) {
      this.timeController.continue();
    } else {
      this.timeController.pause();
    }

    this.props.playerChangeState({
      ...this.props.playerState,
      playStatus
    });
  }

  controlPanel() {
    return this.state.panelVisible ? (
      <ControlPanel
        playStatus={this.props.playerState.playStatus}
        time={this.props.playerState.time}
        playPause={this.playPause.bind(this)}
        timeStepSize={this.props.playerState.timeStepSize}
        changeTimeStepSize={this.props.changeTimeStepSize}
        changeTimeshift={this.timeController.changeTimeshift.bind(
          this.timeController
        )}
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
      this.visibleTimeout(10000000);
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
  private pauseTimestamp: number;
  constructor(
    private _pushTime: IPushTimeCb,
    private _changeTimeShift: IChangeTimeShiftCb,
    startTime: number = Date.now()
  ) {
    this.startInterval();
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
    }, 4000);
  }
  pause() {
    this.pauseTimestamp = Date.now();
    this.clearAllTimers();
  }
  continue() {
    this.timeshift = this.timeshift + this.pauseTimestamp - Date.now();
    this.startInterval();
  }
  startInterval() {
    this.intervalId = setInterval(this.pushTime.bind(this), 1000);
  }
}

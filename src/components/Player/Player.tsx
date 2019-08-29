import * as React from "react";
import { connect } from "react-redux";
import { chageView, IChangeViewCreater } from "../../action/app";
import { IstateCams, Istate } from "../../state/Istate";
import { bindActionCreators } from "redux";
import PlayerBody from "./Body";
import { style, imgLoadingStyle } from "./style";
import { SelfGuidedGenerator, delay } from "../../utilites";
import { httpGetTranslation, IHttpGetTranslationResult } from "../../HTTP";

declare var stb: any;

type IProp = IstateToProps & IDispatchProps;

export interface IComponentState {
  loading?: boolean;
  playStatus: boolean;
}

interface IStateContainer {
  playerState: IComponentState;
}

export type IPropBodyComponent = IProp &
  IStateContainer &
  IplayerChangeStateProp;

interface IplayerChangeState {
  (newState: IComponentState): void;
}
interface IplayerChangeStateProp {
  playerChangeState: IplayerChangeState;
}

class Player extends React.Component<IProp, IComponentState> {
  constructor(props: IProp) {
    super(props);
    this.state = {
      loading: true,
      playStatus: false
    };
  }
  render() {
    return <div style={style}>{this.content()}</div>;
  }
  content() {
    if (this.state.loading) {
      return this.loadingImg();
    } else {
      return this.getBody();
    }
  }
  loadingImg() {
    return (
      <img style={imgLoadingStyle} src="./../forpost-app/img/loading_5.gif" />
    );
  }
  getBody() {
    return (
      <PlayerBody
        items={this.props.items}
        gridActiveItemPosition={this.props.gridActiveItemPosition}
        gridMaxItems={this.props.gridMaxItems}
        grigPage={this.props.grigPage}
        gridLoading={this.props.gridLoading}
        chageView={this.props.chageView}
        playerState={this.state}
        playerChangeState={this.playerChangeState.bind(this)}
        currentPlay={this.props.currentPlay}
        SessionID={this.props.SessionID}
      />
    );
  }
  playerChangeState(newState: IComponentState) {
    this.setState({ ...this.state, ...newState });
  }
  componentDidMount() {
    const self = this;

    new SelfGuidedGenerator(function*(g) {
      const data: IHttpGetTranslationResult = yield httpGetTranslation(
        self.props.SessionID,
        self.props.currentPlay.CameraID,
        "HLS",
        g.next.bind(g)
      );

      try {
        stb.SetTopWin(0);
        stb.SetPIG(1, 0, 0, 0);
        stb.PlaySolution("auto", data.URL);

        const eventListener = (event: any) => {
          if (event == 4) {
            g.next(true);
            stb.rmEvenListener(eventListener);
          }
        };

        stb.addEventListener(eventListener);
        yield;
      } catch (e) {
        console.log(e);
      }
      self.playerChangeState({
        ...self.state,
        loading: false,
        playStatus: true
      });
    });
  }
}

interface IDispatchProps {
  chageView: IChangeViewCreater;
}

interface authProps {
  SessionID: string;
}

type IstateToProps = authProps & IstateCams;

export default connect<IstateToProps, IDispatchProps>(
  (state: Istate) => {
    return { ...state.cams, SessionID: state.auth.SessionID };
  },
  disptach =>
    bindActionCreators(
      {
        chageView
      },
      disptach
    )
)(Player);

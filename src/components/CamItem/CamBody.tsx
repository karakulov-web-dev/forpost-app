import * as React from "react";
import { ICamMayBeActive } from "../Panel/Grid";
import {
  camBodyStyle,
  imgWrapStyle,
  imgCamStyle,
  imgLoadingStyle
} from "./style";
import { SelfGuidedGenerator, delay } from "../../utilites";
import { httpGetTranslation, IHttpGetTranslationResult } from "../../HTTP";
import { connect } from "react-redux";
import { Istate } from "../../state/Istate";

type IProp = ICamBodyProps & IstateProp;
interface IstateProp {
  SessionID: string;
}
interface ICamBodyProps {
  cam: ICamMayBeActive;
}
interface ICamBodyState {
  imgUrl: string;
}

class CamBody extends React.Component<IProp, ICamBodyState> {
  private mount: boolean = false;
  private generator: SelfGuidedGenerator;
  constructor(props: IProp) {
    super(props);
    this.state = {
      imgUrl: ""
    };
  }
  render() {
    return <div style={camBodyStyle}>{this.getImg()}</div>;
  }
  getImg() {
    let display1 = "none";
    let display2 = "block";

    if (this.state.imgUrl) {
      [display1, display2] = [display2, display1];
    }
    const loadingUrl = this.props.cam.active
      ? "./../forpost-app/img/loading_2.gif"
      : "./../forpost-app/img/loading_1.gif";

    return (
      <div style={imgWrapStyle}>
        <img
          style={{
            ...imgCamStyle,
            display: display1
          }}
          src={this.state.imgUrl}
        />
        <img
          style={{
            ...imgLoadingStyle,
            display: display2
          }}
          src={loadingUrl}
        />
      </div>
    );
  }
  componentDidMount() {
    let self = this;
    self.mount = true;
    self.generator = new SelfGuidedGenerator(function*(generator) {
      let data: IHttpGetTranslationResult = yield httpGetTranslation(
        self.props.SessionID,
        self.props.cam.CameraID,
        "JPG",
        generator.next.bind(generator)
      );
      yield delay(1000, generator.next.bind(generator));
      self.setState({
        ...self.state,
        imgUrl: data.URL
      });
      while (self.mount) {
        yield delay(1000, generator.next.bind(generator));
        self.setState({
          ...self.state,
          imgUrl: data.URL + "?_" + Math.random()
        });
      }
    });
  }
  componentWillUnmount() {
    this.mount = false;
    this.generator.return();
  }
}

export default connect<IstateProp>((state: Istate) => {
  return {
    SessionID: state.auth.SessionID
  };
})(CamBody);

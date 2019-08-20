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
declare var stb: any;

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
  private refImg: HTMLImageElement;
  constructor(props: IProp) {
    super(props);
    this.state = {
      imgUrl: ""
    };
  }
  render() {
    return <div style={camBodyStyle}>{this.getImg()}</div>;
  }
  setImgRef(elem: HTMLImageElement) {
    this.refImg = elem;
  }
  getImg() {
    let displayMedia = "none";
    let displayLoading = "block";

    if (this.state.imgUrl) {
      [displayMedia, displayLoading] = [displayLoading, displayMedia];
    }
    const loadingUrl = this.props.cam.active
      ? "./../forpost-app/img/loading_2.gif"
      : "./../forpost-app/img/loading_1.gif";

    return (
      <div style={imgWrapStyle}>
        {this.getMediaContent(displayMedia)}
        <img
          style={{
            ...imgLoadingStyle,
            display: displayLoading
          }}
          src={loadingUrl}
        />
      </div>
    );
  }
  getMediaContent(display: string) {
    if (stb.__type__ === "mag") {
      return (
        <img
          style={{
            ...imgCamStyle,
            display: display
          }}
          src={this.state.imgUrl}
          ref={this.setImgRef.bind(this)}
        />
      );
    } else {
      return (
        <img
          style={{
            ...imgCamStyle,
            display: display
          }}
          src={this.state.imgUrl}
          ref={this.setImgRef.bind(this)}
        />
      );
    }
  }
  componentDidMount() {
    let self = this;
    self.mount = true;
    self.generator = new SelfGuidedGenerator(function*(generator) {
      const mediaFormat = stb.__type__ === "mag" ? "JPG" : "JPG";

      let data: IHttpGetTranslationResult = yield httpGetTranslation(
        self.props.SessionID,
        self.props.cam.CameraID,
        mediaFormat,
        generator.next.bind(generator)
      );
      yield delay(1000, generator.next.bind(generator));

      let proxy =
        stb.__type__ === "mag"
          ? "http://212.77.128.203/nodejsapp/forpost-app-server-side/image?url="
          : "";

      data.URL = `${proxy}${data.URL}`;
      self.setState({
        ...self.state,
        imgUrl: data.URL
      });
      while (self.mount) {
        let delayTime = stb.__type__ === "mag" ? 5000 : 2500;
        yield delay(delayTime, generator.next.bind(generator));
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

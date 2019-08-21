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

interface ICoords {
  width: number;
  height: number;
  left: number;
  top: number;
}

class CamBody extends React.Component<IProp, ICamBodyState> {
  private contentCoords: ICoords = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  private stbPlay: boolean = false;
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

      let proxy = stb.__type__ === "mag" ? "" : "";

      data.URL = `${proxy}${data.URL}`;

      let img = new Image();
      img.onload = () => {
        generator.next(true);
        img.onload = null;
      };
      img.src = data.URL;
      yield; //---------------

      yield delay(200, generator.next.bind(generator));

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
    return;
  }
  componentDidUpdate() {
    const self = this;
    if (!self.props.cam.active) {
      self.stbPlay = false;
      self.contentCoords = {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      };
      return;
    }
    let coordImg: ICoords = self.refImg.getBoundingClientRect();
    let coord: ICoords = self.contentCoords;

    if (
      !(
        coordImg.height === coord.height &&
        coordImg.width === coord.width &&
        coordImg.top === coord.top &&
        coordImg.left === coord.left
      )
    ) {
      self.contentCoords = coordImg;
      coord = coordImg;
      if (self.stbPlay) {
        try {
          stb.SetViewport(
            coord.width * 1.5,
            coord.height * 1.5,
            coord.left * 1.5,
            coord.top * 1.5
          );
        } catch (e) {
          console.log(e);
        }
      }
    }

    if (!self.stbPlay && (stb.__type__ === "mag" || stb.__type__ === "tvip")) {
      new SelfGuidedGenerator(function*(g) {
        let data: IHttpGetTranslationResult = yield httpGetTranslation(
          self.props.SessionID,
          self.props.cam.CameraID,
          "HLS",
          g.next.bind(g)
        );
        try {
          stb.SetTopWin(0);
          stb.SetViewport(
            coord.width * 1.5,
            coord.height * 1.5,
            coord.left * 1.5,
            coord.top * 1.5
          );
          stb.PlaySolution("auto", data.URL);
          stb.SetTopWin(1);
          self.stbPlay = true;
        } catch (e) {
          console.log(e);
        }
      });
    }
  }
  componentWillUnmount() {
    this.mount = false;
    this.generator.return();
    if (this.props.cam.active) {
      try {
        stb.Stop();
        stb.SetTopWin(0);
      } catch (e) {
        console.log(e);
      }
    }
  }
}

export default connect<IstateProp>((state: Istate) => {
  return {
    SessionID: state.auth.SessionID
  };
})(CamBody);

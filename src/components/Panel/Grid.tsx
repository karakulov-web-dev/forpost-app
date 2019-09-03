import * as React from "react";
import { IstateCams, Istate, ICam } from "../../state/Istate";
import { connect } from "react-redux";
import {
  gridStyle,
  noItemsMessageStyle,
  loadingStyle,
  arrowRStyle,
  arrowLStyle
} from "./style";
import { Rows } from "./Rows";
import {
  changeStateCams,
  IChangeStateCamsActionCreator,
  loadCamItems,
  IloadCamItems,
  IPlayCam,
  play
} from "../../action/cam";
import { bindActionCreators } from "redux";
import { SelfGuidedGenerator, delay } from "../../utilites";
import { chageView, IChangeViewCreater } from "../../action/app";

export interface ICamMayBeActive extends ICam {
  active: boolean;
}

type Props = IstateCams & IDispatchProps;
class Grid extends React.Component<Props> {
  private rows: ICamMayBeActive[][];
  private ref: HTMLElement;
  render() {
    return (
      <div
        style={gridStyle}
        onKeyDown={this.key.bind(this)}
        ref={this.setRef.bind(this)}
        tabIndex={1}
      >
        {this.renderLogic()}
        {this.arrowR()}
        {this.arrowL()}
      </div>
    );
  }
  renderLogic() {
    if (this.props.gridLoading) {
      return (
        <img style={loadingStyle} src="./../forpost-app/img/loading_3.gif" />
      );
    }
    let cams = this.getcamArr();
    if (cams.length <= 0) {
      return <p style={noItemsMessageStyle}>Нет доступных видеокамер!</p>;
    }
    this.rows = [];

    let i = 0;
    cams.forEach(item => {
      this.rows[i] = this.rows[i] || [];
      if (this.rows[i].length > 2) {
        i++;
        this.rows[i] = this.rows[i] || [];
      }
      this.rows[i].push(item);
    });

    if (cams.length === 4) {
      this.rows = [[cams[0], cams[1]], [cams[2], cams[3]]];
    }

    if (cams.length === 3) {
      this.rows = [[cams[0], cams[1]], [cams[2]]];
    }

    return <Rows rows={this.rows} />;
  }
  getcamArr(): ICamMayBeActive[] {
    let cams = this.props.items;
    const maxItems = this.props.gridMaxItems;
    const countItems = cams.length;
    let startIndex = maxItems * this.props.grigPage;
    let maxIndex = startIndex + maxItems - 1;
    maxIndex = maxIndex >= countItems ? countItems - 1 : maxIndex;
    if (maxIndex < startIndex) {
      return [];
    }
    let camArr = cams.filter((item, i) => {
      let status: boolean;
      if (i < startIndex || i > maxIndex) {
        status = false;
      } else {
        status = true;
      }
      i++;
      return status;
    });
    return this.camtoCamMayBeActive(camArr);
  }
  camtoCamMayBeActive(cams: ICam[]): ICamMayBeActive[] {
    return cams.map((item, i) => {
      return { ...item, active: i === this.props.gridActiveItemPosition };
    });
  }
  key(e: React.KeyboardEvent) {
    const { key } = e;

    if (key === "Escape") {
      this.props.chageView("/exit");
    }

    if (key === "Enter") {
      let flatRowsArr: ICamMayBeActive[] = [].concat(...this.rows);
      let activeItem = flatRowsArr[this.props.gridActiveItemPosition];
      this.props.changeStateCams({ ...this.props, currentPlay: activeItem });
      this.props.play();
    }

    switch (key) {
      case "ArrowRight":
        this.changeActivePosition(1, 0);
        break;
      case "ArrowLeft":
        this.changeActivePosition(-1, 0);
        break;
      case "ArrowUp":
        this.changeActivePosition(0, -1);
        break;
      case "ArrowDown":
        this.changeActivePosition(0, 1);
        break;
    }

    interface InumbersMap {
      [key: string]: number;
    }
    const numbersKeyMap: InumbersMap = {
      "49": 1,
      "50": 2,
      "51": 3,
      "52": 4,
      "53": 5,
      "54": 6,
      "55": 7,
      "56": 8,
      "57": 9
    };

    const num = numbersKeyMap[String(e.keyCode)];

    if (typeof num !== "undefined") {
      const self = this;
      new SelfGuidedGenerator(function*(g) {
        self.props.changeStateCams({
          gridLoading: true
        });
        yield delay(200, g.next.bind(g));
        self.props.changeStateCams({
          gridMaxItems: num,
          gridActiveItemPosition: 0,
          grigPage: 0,
          gridLoading: false
        });
      });
    }
  }
  changeActivePosition(x: number, y: number) {
    let flatRowsArr: ICamMayBeActive[] = [].concat(...this.rows);
    let activeItem = flatRowsArr[this.props.gridActiveItemPosition];
    var activeItemInRow = 0;
    let activeRowIndex = this.rows.reduce((p, c, i, a) => {
      let activeItemIndex = c.indexOf(activeItem);
      if (activeItemIndex !== -1) {
        activeItemInRow = activeItemIndex;
        return i;
      } else {
        return p;
      }
    }, 0);

    let newRowType = typeof this.rows[activeRowIndex + y];
    let newItemType = this.rows[activeRowIndex + y]
      ? typeof this.rows[activeRowIndex + y][activeItemInRow + x]
      : "undefined";

    let newActiveItem: ICamMayBeActive;
    if (newRowType !== "undefined" && newItemType !== "undefined") {
      newActiveItem = this.rows[activeRowIndex + y][activeItemInRow + x];
    } else if (newRowType !== "undefined") {
      if (y) {
        newActiveItem = this.rows[activeRowIndex + y][
          this.rows[activeRowIndex + y].length - 1
        ];
      } else {
        newActiveItem = activeItem;
      }
    } else {
      newActiveItem = activeItem;
    }

    let gridActiveItemPosition = flatRowsArr.indexOf(newActiveItem);

    this.props.changeStateCams({
      gridActiveItemPosition
    });

    if (this.props.gridActiveItemPosition === gridActiveItemPosition) {
      this.changePage(x);
    }
  }
  changePage(dif: number) {
    const self = this;
    let grigPage = this.props.grigPage + dif;

    if (!dif) {
      return;
    }

    if (!this.pageExist(grigPage)) {
      return;
    }

    new SelfGuidedGenerator(function*(g) {
      self.props.changeStateCams({
        gridLoading: true
      });
      yield delay(200, g.next.bind(g));
      self.props.changeStateCams({
        grigPage,
        gridActiveItemPosition: 0,
        gridLoading: false
      });
    });
  }
  pageExist(page: number) {
    let startIndex = this.props.gridMaxItems * page;
    if (typeof this.props.items[startIndex] === "undefined") {
      return false;
    } else {
      return true;
    }
  }
  arrowR() {
    if (this.pageExist(this.props.grigPage + 1)) {
      return (
        <img
          src="./../forpost-app/img/arrow-r.png"
          alt="arrowR"
          style={arrowRStyle}
        />
      );
    }
  }
  arrowL() {
    if (this.pageExist(this.props.grigPage - 1)) {
      return (
        <img
          src="./../forpost-app/img/arrow-l.png"
          alt="arrowL"
          style={arrowLStyle}
        />
      );
    }
  }
  setRef(ref: HTMLElement) {
    this.ref = ref;
  }
  componentDidMount() {
    this.ref.focus();
    if (this.props.items.length > 0) {
      return;
    }
    this.props.changeStateCams({
      gridLoading: true
    });
    this.props.loadCamItems();
  }
}

interface IDispatchProps {
  changeStateCams: IChangeStateCamsActionCreator;
  loadCamItems: IloadCamItems;
  play: IPlayCam;
  chageView: IChangeViewCreater;
}

export default connect<IstateCams, IDispatchProps>(
  (state: Istate) => state.cams,
  disptach =>
    bindActionCreators(
      {
        changeStateCams,
        loadCamItems,
        play,
        chageView
      },
      disptach
    )
)(Grid);

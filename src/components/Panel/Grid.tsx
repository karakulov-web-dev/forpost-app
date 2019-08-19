import * as React from "react";
import { IstateCams, Istate, ICam } from "../../state/Istate";
import { connect } from "react-redux";
import { gridStyle, noItemsMessageStyle, loadingStyle } from "./style";
import { Rows } from "./Rows";
import {
  changeStateCams,
  IChangeStateCamsActionCreator,
  loadCamItems,
  IloadCamItems
} from "../../action/cam";
import { bindActionCreators } from "redux";

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
    return <Rows rows={this.rows} />;
  }
  getcamArr(): ICamMayBeActive[] {
    let cams = this.camtoCamMayBeActive(this.props.items);
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

    return camArr;
  }
  camtoCamMayBeActive(cams: ICam[]): ICamMayBeActive[] {
    return cams.map((item, i) => {
      return { ...item, active: i === this.props.gridActiveItemPosition };
    });
  }
  key(e: React.KeyboardEvent) {
    const { key } = e;

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

    if (typeof numbersKeyMap[String(e.keyCode)] !== "undefined") {
      this.props.changeStateCams({
        gridMaxItems: numbersKeyMap[String(e.keyCode)],
        gridActiveItemPosition: 0
      });
    }
  }
  changeActivePosition(x: number, y: number) {
    let flatRowsArr = [].concat(...this.rows);
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

    let newActiveItem =
      typeof this.rows[activeRowIndex + y] !== "undefined" &&
      typeof this.rows[activeRowIndex + y][activeItemInRow + x] !== "undefined"
        ? this.rows[activeRowIndex + y][activeItemInRow + x]
        : activeItem;

    let gridActiveItemPosition = flatRowsArr.indexOf(newActiveItem);
    this.props.changeStateCams({
      gridActiveItemPosition
    });
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
}

export default connect<IstateCams, IDispatchProps>(
  (state: Istate) => state.cams,
  disptach =>
    bindActionCreators(
      {
        changeStateCams,
        loadCamItems
      },
      disptach
    )
)(Grid);

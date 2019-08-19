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
    let rows: ICamMayBeActive[][] = [];

    let i = 0;
    cams.forEach(item => {
      rows[i] = rows[i] || [];
      if (rows[i].length > 2) {
        i++;
        rows[i] = rows[i] || [];
      }
      rows[i].push(item);
    });

    if (cams.length === 4) {
      rows = [[cams[0], cams[1]], [cams[2], cams[3]]];
    }
    return <Rows rows={rows} />;
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

    console.log(e.keyCode);

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
        gridMaxItems: numbersKeyMap[String(e.keyCode)]
      });
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

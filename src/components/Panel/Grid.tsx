import * as React from "react";
import { IstateCams, Istate, ICam } from "../../state/Istate";
import { connect } from "react-redux";
import { gridStyle } from "./style";
import { Rows } from "./Rows";

export interface ICamMayBeActive extends ICam {
  active: boolean;
}

type Props = IstateCams;
class Grid extends React.Component<Props> {
  render() {
    let cams = this.getcamArr();
    if (cams.length <= 0) {
      return <div style={gridStyle}>Нет доступных видеокамер</div>;
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
    return (
      <div style={gridStyle}>
        <Rows rows={rows} />
      </div>
    );
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
    var i = 0;
    let camArr = cams.filter(item => {
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
    let i = 0;
    return cams.map(item => {
      return { ...item, active: i === this.props.gridActiveItemPosition };
    });
  }
}

export default connect<IstateCams>((state: Istate) => state.cams)(Grid);

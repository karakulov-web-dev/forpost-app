import * as React from "react";
import { ICamMayBeActive } from "./Grid";
import { CamItem } from "../CamItem/CamItem";

interface IRowsProp {
  rows: ICamMayBeActive[][];
}
export class Rows extends React.Component<IRowsProp> {
  render() {
    return (
      <div
        style={{
          height: "100%"
        }}
      >
        {this.props.rows.map((item, i) => {
          return this.createRow(`rowsId${i + 1}`, item, this.props.rows.length);
        })}
      </div>
    );
  }
  createRow(key: string, row: ICamMayBeActive[], rowsCount: number) {
    let height = `${Math.round(100 / rowsCount)}%`;
    let style: React.CSSProperties = { height, position: "relative" };
    return (
      <div style={style} key={key}>
        {row.map((item, i) => {
          i++;
          return this.createItem(item, i - 1, row.length, key);
        })}
      </div>
    );
  }
  createItem(
    cam: ICamMayBeActive,
    position: number,
    lengthRow: number,
    keyPrefix: string
  ) {
    let width = `${Math.round(100 / lengthRow)}%`;
    let height = "100%";
    let top: "0px";
    let left = `${(100 / lengthRow) * position}%`;
    let style: React.CSSProperties = {
      width,
      height,
      top,
      left,
      position: "absolute"
    };
    return (
      <div style={style} key={`${keyPrefix}_camItem_${position}`}>
        <CamItem cam={cam} />
      </div>
    );
  }
}

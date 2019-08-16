import * as React from "react";
import { ICamMayBeActive } from "./Grid";

interface IRowsProp {
  rows: ICamMayBeActive[][];
}
export class Rows extends React.Component<IRowsProp> {
  render() {
    let i = 0;
    console.log(this.props.rows);
    let rows = this.props.rows.map(item => {
      i++;
      return this.createRow(`rowsId${i}`, item, this.props.rows.length);
    });
    return (
      <div
        style={{
          height: "100%"
        }}
      >
        {rows}
      </div>
    );
  }
  createRow(key: string, row: ICamMayBeActive[], rowsCount: number) {
    let height = `${Math.round(100 / rowsCount)}%`;
    let style: React.CSSProperties = { height, position: "relative" };

    let i = -1;
    let items = row.map(item => {
      i++;
      return this.createItem(item, i, row.length, key);
    });
    return (
      <div style={style} key={key}>
        {items}
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

interface ICamItemProps {
  cam: ICamMayBeActive;
}
class CamItem extends React.Component<ICamItemProps> {
  render() {
    let style: React.CSSProperties = {
      background: "blue",
      border: "5px solid black",
      top: "10px",
      left: "10px",
      right: "10px",
      bottom: "10px",
      position: "absolute"
    };
    return <div style={style}>item</div>;
  }
}

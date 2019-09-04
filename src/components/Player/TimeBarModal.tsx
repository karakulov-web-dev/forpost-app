import * as React from "react";
import { IchangeTimeshift } from "./Body";
import { timeBarModalStyle, timeBarModalHeader } from "./style";
import TimeBarSubmit from "./TimeBarSubmit";
import TimeBarSelect from "./TimeBarSelect";

interface IProp {
  changeTimeshift: IchangeTimeshift;
  switch: IswitchModal;
  time: number;
}

interface IswitchModal {
  (): void;
}

interface IState {
  focusIndex: number;
}

export interface IselectDate {
  name: string;
  time: number;
  key: number;
  active?: boolean;
}

export default class TimeBarModal extends React.Component<IProp, IState> {
  private selectDateItems: IselectDate[][] = [];
  constructor(props: IProp) {
    super(props);
    this.state = {
      focusIndex: 0
    };

    // create days for selectDateItems
    const mapCb = (c: number, i: number) => {
      const date = new Date(c - 24 * 60 * 60 * 1000 * i);
      const day = date.getDate();
      const month = date.getMonth();
      const weekDay = date.getDay();
      const time = date.getTime();
      const name = `${day} ${this.monthNumberToText(
        month
      )}, ${this.weekDayNumberToText(weekDay)}`;
      return { name, time, key: Math.random() };
    };
    const findStartDay = () => {
      const currDate = new Date();
      return new Date(
        currDate.getFullYear(),
        currDate.getMonth(),
        currDate.getDate()
      );
    };
    const days: IselectDate[] = new Array(3).fill(findStartDay()).map(mapCb);
    days.unshift({ name: "Число, день недели", time: 0, key: Math.random() });

    // create hours for selectDateItems
    const hours = new Array(23).fill(1).map((c, i) => {
      return {
        name: String(c * i),
        time: i * 1000 * 60 * 60,
        key: Math.random()
      };
    });
    hours.unshift({ name: "Часы", time: 0, key: Math.random() });

    // create minutes for selectDateItems
    const minutes = new Array(60).fill(1).map((c, i) => {
      return {
        name: String(c * i),
        time: i * 1000 * 60,
        key: Math.random()
      };
    });
    minutes.unshift({ name: "Минуты", time: 0, key: Math.random() });

    const seconds = new Array(60).fill(1).map((c, i) => {
      return {
        name: String(c * i),
        time: i * 1000,
        key: Math.random()
      };
    });
    seconds.unshift({ name: "Секунды", time: 0, key: Math.random() });

    this.selectDateItems = [days, hours, minutes, seconds];
  }
  monthNumberToText(month: number) {
    return [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря"
    ][month];
  }
  weekDayNumberToText(day: number) {
    return ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"][day];
  }
  render() {
    return (
      <div
        tabIndex={1}
        ref={this.setElem.bind(this)}
        onKeyDown={this.key.bind(this)}
        style={timeBarModalStyle}
      >
        <h1 style={timeBarModalHeader}>Дата и время</h1>
        <TimeBarSelect
          focus={this.isFocus(0)}
          items={this.selectDateItems[0]}
        />
        <TimeBarSelect
          focus={this.isFocus(1)}
          items={this.selectDateItems[1]}
        />
        <TimeBarSelect
          focus={this.isFocus(2)}
          items={this.selectDateItems[2]}
        />
        <TimeBarSelect
          focus={this.isFocus(3)}
          items={this.selectDateItems[3]}
        />
        <TimeBarSubmit
          focus={this.isFocus(4)}
          submit={this.submit.bind(this)}
        />
      </div>
    );
  }
  private elem: HTMLElement;
  setElem(elem: HTMLElement) {
    this.elem = elem;
  }
  key(e: React.KeyboardEvent) {
    if (e.key === "Escape" || e.key === "Backspace") {
      this.props.switch();
    }

    let { focusIndex } = this.state;
    if (e.key === "ArrowDown" && this.state.focusIndex < 4) {
      focusIndex++;
    }

    if (e.key === "ArrowUp" && this.state.focusIndex > 0) {
      focusIndex--;
    }

    this.setState({ ...this.state, focusIndex });

    e.stopPropagation();
  }
  submit() {
    const filter = (c: IselectDate) => c.active;
    const reducer = (p: number, c: IselectDate) => {
      return p + c.time;
    };

    let targetTime = this.selectDateItems
      .flat()
      .filter(filter)
      .reduce(reducer, 0);

    let currentTime = Date.now();
    if (targetTime < currentTime) {
      let timeshift = this.props.time - currentTime;
      let diff = targetTime - currentTime;
      this.props.changeTimeshift(diff - timeshift);
    }
    this.props.switch();
  }
  isFocus(index: number) {
    return this.state.focusIndex === index;
  }
  componentDidMount() {
    this.elem.focus();
  }
  shouldComponentUpdate(nextProps: IProp, nexState: IState) {
    let needUpdate = false;
    if (nexState.focusIndex !== this.state.focusIndex) {
      needUpdate = true;
    }
    if (nextProps.switch !== this.props.switch) {
      needUpdate = true;
    }
    return needUpdate;
  }
}

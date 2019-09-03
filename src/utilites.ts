import { color1 } from "./components/style";

interface GeneratorCreater {
  (self: SelfGuidedGenerator): any;
}
export class SelfGuidedGenerator {
  constructor(generatorCreater: GeneratorCreater) {
    this.generator = generatorCreater(this);
    this.generator.next();
  }
  public next(arg: any) {
    return this.generator.next(arg);
  }
  public return(arg?: any) {
    return this.generator.return(arg);
  }
  public generator: Generator;
}

interface Idelay {
  (time: number, cb: Function): void;
}

export const delay: Idelay = (time, cb) => {
  setTimeout(cb, time);
};

interface IParamKeyValue {
  [key: string]: string;
}
export function parseGetParams(par: string): string {
  var tmp = new Array(); // два вспомагательных
  var tmp2 = new Array(); // массива
  var param: IParamKeyValue = {};
  var get = location.search; // строка GET запроса
  var result = ""; //переменная результата
  if (get != "") {
    tmp = get.substr(1).split("&"); // разделяем переменные
    for (var i = 0; i < tmp.length; i++) {
      tmp2 = tmp[i].split("="); // массив param будет содержать
      param[tmp2[0]] = tmp2[1]; // пары ключ(имя переменной)->значение
    }
  }
  if (typeof param[par] != "undefined") {
    result = param[par];
  }
  return result;
}

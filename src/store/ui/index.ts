import { makeAutoObservable } from "mobx";
import filters, { Filter } from "./filters";

class UIStore {
  stream?: MediaStream;
  filter: Filter;

  constructor() {
    makeAutoObservable(this);

    this.filter = filters[0];
  }

  setStream = (stream: MediaStream) => {
    this.stream = stream;
  };
}

export default UIStore;

import { makeAutoObservable } from "mobx";
import filters, { Filter } from "./filters";

class UIStore {
  stream?: MediaStream;
  filter: Filter;
  viewPreview: boolean;

  constructor() {
    makeAutoObservable(this);

    this.filter = filters[0];
    this.viewPreview = false;
  }

  setStream = (stream: MediaStream) => {
    this.stream = stream;
  };

  setPreview = (status: boolean) => {
    this.viewPreview = status;
  };

  setFilter = (filter: Filter) => {
    this.filter = filter;
  };
}

export default UIStore;

import { action, makeAutoObservable } from "mobx";

class UIStore {
  stream?: MediaStream;

  constructor() {
    makeAutoObservable(this);
  }

  setStream = (stream: MediaStream) => {
    this.stream = stream;
  };
}

export default UIStore;

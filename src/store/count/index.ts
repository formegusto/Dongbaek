import { makeAutoObservable } from "mobx";

class CountStore {
  count: number;

  constructor() {
    makeAutoObservable(this);

    this.count = 0;
  }

  increase = () => {
    this.count += 1;
  };

  decrease = () => {
    this.count -= 1;
  };
}

export default CountStore;

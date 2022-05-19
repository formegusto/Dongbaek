import CountStore from "./count";

class RootStore {
  count: CountStore;

  constructor() {
    this.count = new CountStore();
  }
}

export default RootStore;

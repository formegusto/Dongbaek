import AuthStore from "./auth";
import CountStore from "./count";

class RootStore {
  count: CountStore;
  auth: AuthStore;

  constructor() {
    this.count = new CountStore();
    this.auth = new AuthStore();
  }
}

export default RootStore;

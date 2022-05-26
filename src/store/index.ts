import AuthStore from "./auth";
import CountStore from "./count";
import DongbaekStore from "./dongbaek";

class RootStore {
  count: CountStore;
  auth: AuthStore;
  dongbaek: DongbaekStore;

  constructor() {
    this.count = new CountStore();
    this.auth = new AuthStore();
    this.dongbaek = new DongbaekStore();
  }
}

export default RootStore;

import AuthStore from "./auth";
import CountStore from "./count";
import DongbaekStore from "./dongbaek";
import UIStore from "./ui";

class RootStore {
  count: CountStore;
  auth: AuthStore;
  dongbaek: DongbaekStore;
  ui: UIStore;

  constructor() {
    this.count = new CountStore();
    this.auth = new AuthStore();
    this.dongbaek = new DongbaekStore();
    this.ui = new UIStore();
  }
}

export default RootStore;

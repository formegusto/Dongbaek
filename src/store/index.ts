import AuthStore from "./auth";
import DongbaekStore from "./dongbaek";
import UIStore from "./ui";

class RootStore {
  auth: AuthStore;
  dongbaek: DongbaekStore;
  ui: UIStore;

  constructor() {
    this.auth = new AuthStore(this);
    this.dongbaek = new DongbaekStore(this);
    this.ui = new UIStore();
  }
}

export default RootStore;

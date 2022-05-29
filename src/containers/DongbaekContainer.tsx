import { inject, observer } from "mobx-react";
import RootStore from "../store";
import DongbaekStore from "../store/dongbaek";

type Props = {
  store?: DongbaekStore;
};

function DongbaekContainer() {
  return <></>;
}

export default inject((store: RootStore) => ({ store: store.dongbaek }))(
  observer(DongbaekContainer)
);

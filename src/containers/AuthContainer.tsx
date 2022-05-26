import { inject, observer } from "mobx-react";
import React from "react";
import RootStore from "../store";
import AuthStore from "../store/auth";

type Props = {
  store?: AuthStore;
};

function AuthContainer({ store }: Props) {
  React.useEffect(() => {
    store?.signIn();
  }, [store]);

  React.useEffect(() => {
    if (store?.token) store.check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store?.token]);

  React.useEffect(() => {
    if (store?.auth) console.log(store.auth);
  }, [store?.auth]);

  return <></>;
}

export default inject((store: RootStore) => ({
  store: store.auth,
}))(observer(AuthContainer));

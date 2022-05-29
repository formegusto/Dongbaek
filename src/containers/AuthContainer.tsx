import { inject, observer } from "mobx-react";
import React from "react";
import AuthComponent from "../components/AuthComponent";
import RootStore from "../store";
import AuthStore from "../store/auth";

type Props = {
  store?: AuthStore;
};

export type Mode = "sign-in" | "sign-up";

function AuthContainer({ store }: Props) {
  const [mode, setMode] = React.useState<Mode>("sign-in");

  const changeMode = React.useCallback((mode: Mode) => {
    setMode(mode);
  }, []);

  return <AuthComponent mode={mode} changeMode={changeMode} />;
}

export default inject((store: RootStore) => ({
  store: store.auth,
}))(observer(AuthContainer));

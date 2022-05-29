import { inject, observer } from "mobx-react";
import React from "react";
import AuthComponent from "../components/AuthComponent";
import RootStore from "../store";
import AuthStore from "../store/auth";

type Props = {
  store?: AuthStore;
  setStream?: (stream: MediaStream) => void;
};

export type Mode = "sign-in" | "sign-up";

function AuthContainer({ store, setStream }: Props) {
  const [mode, setMode] = React.useState<Mode>("sign-in");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  const changeMode = React.useCallback((mode: Mode) => {
    setMode(mode);
  }, []);

  const changeLoading = React.useCallback(
    (e: React.FormEvent, loading: boolean) => {
      e.preventDefault();
      setSuccess(false);
      setLoading(loading);
      setTimeout(() => {
        setLoading(false);

        navigator.mediaDevices
          .getUserMedia({
            video: true,
          })
          .then((stream: MediaStream) => {
            setStream!(stream);
          })
          .catch(console.log);
        setSuccess(true);
      }, 2000);
    },
    [setStream]
  );

  return (
    <AuthComponent
      mode={mode}
      changeMode={changeMode}
      loading={loading}
      changeLoading={changeLoading}
      success={success}
    />
  );
}

export default inject((store: RootStore) => ({
  store: store.auth,
  setStream: store.ui.setStream,
}))(observer(AuthContainer));

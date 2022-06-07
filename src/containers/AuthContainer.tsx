import { inject, observer } from "mobx-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthComponent from "../components/AuthComponent";
import RootStore from "../store";
import AuthStore from "../store/auth";
import { Authentication } from "../store/auth/types";

type Props = {
  store?: AuthStore;
  setStream?: (stream: MediaStream) => void;
};

export type Mode = "sign-in" | "sign-up";

function AuthContainer({ store }: Props) {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState<Authentication>({
    username: "",
    password: "",
  });
  const refDongbaek = React.useRef<HTMLImageElement>(null);
  const [mode, setMode] = React.useState<Mode>("sign-in");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAuth({
        ...auth,
        [e.target.name]: e.target.value,
      });
    },
    [auth]
  );

  const changeMode = React.useCallback((mode: Mode) => {
    setMode(mode);

    setAuth({
      username: "",
      password: "",
    });

    const elUsername = document.querySelector(
      "input[name='username']"
    ) as HTMLInputElement;

    if (elUsername) elUsername.focus();
  }, []);

  const onSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (mode === "sign-in") store?.signIn(auth);
      else if (mode === "sign-up") store?.signUp(auth);

      setSuccess(false);
      setLoading(true);
    },
    [mode, auth, store]
  );

  // Auth Success
  React.useEffect(() => {
    if (store?.token && loading) {
      store.check();

      setTimeout(() => {
        setLoading(false);

        if (refDongbaek && refDongbaek.current) {
          refDongbaek.current.classList.add("success");
        }
      }, 2000);
    }
  }, [store, store?.token, navigate, loading]);

  React.useEffect(() => {
    if (store?.error) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [store?.error]);

  return (
    <AuthComponent
      mode={mode}
      changeMode={changeMode}
      loading={loading}
      onChange={onChange}
      success={success}
      auth={auth}
      onSubmit={onSubmit}
      refDongbaek={refDongbaek}
      error={store?.error}
      errorCheck={store?.errorCheck}
    />
  );
}

export default inject((store: RootStore) => ({
  store: store.auth,
  setStream: store.ui.setStream,
}))(observer(AuthContainer));

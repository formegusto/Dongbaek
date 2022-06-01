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

function AuthContainer({ store, setStream }: Props) {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState<Authentication>({
    username: "",
    password: "",
  });
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
    if (store?.token) {
      store.check();
      navigate("/");
    }
  }, [store, store?.token, navigate]);

  const changeLoading = React.useCallback(
    (e: React.FormEvent, loading: boolean) => {
      e.preventDefault();
      setSuccess(false);
      setTimeout(() => {
        setLoading(false);

        navigator.mediaDevices
          .getUserMedia({
            video: true,
          })
          .then((stream: MediaStream) => {
            setStream!(stream);
            setSuccess(true);

            localStorage.setItem("token", "test");
            navigate("/");
          })
          .catch(console.log);
      }, 2000);
    },
    [setStream, navigate]
  );

  return (
    <AuthComponent
      mode={mode}
      changeMode={changeMode}
      loading={loading}
      onChange={onChange}
      success={success}
      auth={auth}
      onSubmit={onSubmit}
    />
  );
}

export default inject((store: RootStore) => ({
  store: store.auth,
  setStream: store.ui.setStream,
}))(observer(AuthContainer));

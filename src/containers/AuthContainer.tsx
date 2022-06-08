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

// setting mode
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

  // input change observer
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAuth({
        ...auth,
        [e.target.name]: e.target.value,
      });
    },
    [auth]
  );

  // mode change
  const changeMode = React.useCallback((mode: Mode) => {
    setMode(mode);

    // 기존 작성 정보는 비운다.
    setAuth({
      username: "",
      password: "",
    });

    // input auto focusing
    const elUsername = document.querySelector(
      "input[name='username']"
    ) as HTMLInputElement;

    if (elUsername) elUsername.focus();
  }, []);

  // submit
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

  // 로그인 및 회원가입에 성공했을 경우,
  React.useEffect(() => {
    if (store?.token && loading) {
      // 사용자의 인증정보를 요청한다.
      store.check();

      // 바로 이동시키는 것이 아닌,
      // 부드러운 애니메이션과 함께 이동하도록 2초 후에 로딩을 해제 시키고,
      // 성공 애니메이션을 실행한다.
      setTimeout(() => {
        setLoading(false);

        if (refDongbaek && refDongbaek.current) {
          refDongbaek.current.classList.add("success");
        }
      }, 2000);
    }
  }, [store, store?.token, navigate, loading]);

  // 로그인 및 회원가입 실패 시 동작
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

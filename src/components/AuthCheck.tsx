import { inject, observer } from "mobx-react";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import RootStore from "../store";
import { Authorization } from "../store/auth/types";

type Props = {
  auth?: Authorization;
  status?: boolean | undefined;
};

function AuthCheck({ auth, status }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // 인증 체크
    const token = localStorage.getItem("token");
    // 토큰 존재 여부 확인
    if (!token) {
      // 토큰이 없다면 authpage로 리다이렉트 시킨다.
      navigate("/auth", {
        state: {
          from: location.pathname,
        },
      });
    } else {
      // 토큰이 존재한다면 /auth/check API의 응답결과를 기다린다.
      if (status !== undefined) {
        // status에 값이 들어가게 되면 /auch/check API로 부터 응답결과를 받은 상태이다.
        if (!status) {
          // 인증이 여러 이유로 실패했다면 status에는 false값이 들어간다.
          // 유효하지 않은 토큰이기 때문에 토큰을 삭제한 후 authpage로 리다이렉트 시킨다.
          localStorage.removeItem("token");
          navigate("/auth", {
            state: {
              from: location.pathname,
            },
          });
        }
      }
    }
  }, [navigate, location, status]);
  return auth ? <Outlet /> : null;
}

export default inject((store: RootStore) => ({
  auth: store.auth.auth,
  status: store.auth.status,
}))(observer(AuthCheck));

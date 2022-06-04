import { inject, observer } from "mobx-react";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import RootStore from "../store";
import { Authorization } from "../store/auth/types";

type Props = {
  auth?: Authorization;
};

function AuthCheck({ auth }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth", {
        state: {
          from: location.pathname,
        },
      });
    }
  }, [navigate, location]);
  return auth ? <Outlet /> : null;
}

export default inject((store: RootStore) => ({ auth: store.auth.auth }))(
  observer(AuthCheck)
);

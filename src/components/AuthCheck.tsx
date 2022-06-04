import { inject, observer } from "mobx-react";
import { Outlet } from "react-router-dom";
import RootStore from "../store";
import { Authorization } from "../store/auth/types";

type Props = {
  auth?: Authorization;
};

function AuthCheck({ auth }: Props) {
  return auth ? <Outlet /> : null;
}

export default inject((store: RootStore) => ({ auth: store.auth.auth }))(
  observer(AuthCheck)
);

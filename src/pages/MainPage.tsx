import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import DongbaekContainer from "../containers/DongbaekContainer";
import RootStore from "../store";
import { Authorization } from "../store/auth/types";

type Props = {
  auth?: Authorization;
};

function MainPage({ auth }: Props) {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  }, [navigate, auth]);
  return (
    <>
      <DongbaekContainer />
    </>
  );
}

export default inject((store: RootStore) => ({
  auth: store.auth.auth,
}))(observer(MainPage));

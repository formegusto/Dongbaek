import React from "react";
import { useNavigate } from "react-router-dom";
import DongbaekContainer from "../containers/DongbaekContainer";

function MainPage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  }, [navigate]);
  return (
    <>
      <DongbaekContainer />
    </>
  );
}

export default MainPage;

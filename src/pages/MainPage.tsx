import { Outlet } from "react-router-dom";
import DongbaekContainer from "../containers/DongbaekContainer";

function MainPage() {
  return (
    <>
      <DongbaekContainer />
      <Outlet />
    </>
  );
}

export default MainPage;

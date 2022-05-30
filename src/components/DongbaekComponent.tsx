import { ScreenWrapper } from "../styles/Wrapper";
import Polaroid from "./Polaroid";

function DongbaekComponent() {
  return (
    <ScreenWrapper flex fixed>
      <Polaroid />
      {/* <video autoPlay id="dongbaek-stream" width={300} height={200} /> */}
    </ScreenWrapper>
  );
}

export default DongbaekComponent;

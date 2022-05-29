import { ScreenWrapper } from "../styles/Wrapper";

function DongbaekComponent() {
  return (
    <ScreenWrapper flex fixed>
      <video autoPlay id="dongbaek-stream" width={300} height={200} />
    </ScreenWrapper>
  );
}

export default DongbaekComponent;

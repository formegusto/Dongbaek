import React from "react";
import styled from "styled-components";
import CanvasCapture from "./components/CanvasCapture";
// import Carousel from "./components/Carousel";
// import Cube from "./components/Cube";

function App() {
  return (
    <CaptureWrapper>
      <CanvasCapture />
    </CaptureWrapper>
  );
}

const CaptureWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 300px;
  height: 220px;

  & > button {
    margin: 208px 0 0;
  }
`;

const CubeWrapper = styled.div`
  position: relative;
  width: 200px;
  padding-top: 100px;
  margin: 0 auto;
  perspective: 1200px;
`;

const CarouselWrapper = styled.div`
  display: flex;

  width: 100vw;
  height: 100vh;

  justify-content: center;
  align-items: center;
`;

export default App;

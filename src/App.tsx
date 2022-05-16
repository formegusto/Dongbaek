import React from "react";
import styled from "styled-components";
import Carousel from "./components/Carousel";
import Cube from "./components/Cube";

function App() {
  return (
    <CarouselWrapper>
      <Carousel />
    </CarouselWrapper>
  );
}

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

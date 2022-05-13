import React from "react";
import styled from "styled-components";
import Cube from "./components/Cube";

function App() {
  return (
    <Wrapper>
      <Cube />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  padding-top: 100px;
  margin: 0 auto;
  perspective: 1200px;
`;

export default App;

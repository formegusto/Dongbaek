import styled from "styled-components";

function MemoryComponent() {
  return <Wrapper></Wrapper>;
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  min-width: 800px;
  min-height: 700px;

  background-color: rgba(51, 51, 51, 0.6);
`;

export default MemoryComponent;

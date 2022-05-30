import styled from "styled-components";

function Lens() {
  return <Block />;
}

const Block = styled.div`
  position: relative;

  width: 180px;
  height: 180px;

  border-radius: 100%;
  border: 2px solid #333;

  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    top: calc(50% - 65px);
    left: calc(50% - 65px);
    width: 130px;
    height: 130px;

    border-radius: 100%;
    border: 2px solid #333;
    box-sizing: border-box;
  }
`;

export default Lens;

import styled from "styled-components";
import Body from "./Body";
import Flash from "./Flash";

//Body
function Polaroid() {
  return (
    <Wrapper>
      <Block id="polaroid-block">
        <Body />
        <Flash />
      </Block>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  perspective: 1000px;
`;

const Block = styled.div`
  position: relative;
  overflow: visible;

  transform-style: preserve-3d;

  width: 500px;
  height: 340px;
  transform-origin: 50% 50%;
  /* transform: rotateY(-45deg) rotateX(-35deg); */

  & > div:not(.flash) {
    box-shadow: inset 0 0 60px #ccc;
    background-color: #fff;
    border-radius: 16px;
    box-sizing: border-box;
  }

  & > .inner {
    background: #ccc;
    box-shadow: none;
  }
`;

export default Polaroid;

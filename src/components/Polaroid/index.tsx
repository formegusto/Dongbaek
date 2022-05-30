import styled from "styled-components";
import BackItem from "./BackItem";
import Lens from "./Lens";

//Body
function Polaroid() {
  return (
    <Wrapper>
      <Block>
        <Front className="front">
          <Lens />
        </Front>
        <Front className="front inner" />
        <Front className="back">
          <BackItem />
        </Front>
        <Front className="back inner" />
        <Horizontal className="left" />
        <Horizontal className="left inner" />
        <Horizontal className="right" />
        <Horizontal className="right inner" />
        <Vertical className="top" />
        <Vertical className="top inner" />
        <Vertical className="bottom" />
        <Vertical className="bottom inner" />
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
  transform: rotateY(180deg);

  & > div {
    box-shadow: inset 0 0 60px #ccc;
    background-color: #fff;
    border-radius: 16px;
    box-sizing: border-box;
  }

  & > .inner {
    background: #f1f1f1;
    box-shadow: none;
  }
`;

const Vertical = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  height: 120px;

  &.top {
    transform: rotateX(-90deg) translateZ(-60px);
    transform-origin: 50% 50%;
  }
  &.top.inner {
    transform: rotateX(-90deg) translateZ(-60px) translateZ(1px);
    transform-origin: 50% 50%;
  }

  &.bottom {
    transform: translateY(220px) rotateX(-90deg) translateZ(60px);
    transform-origin: 50% 50%;
  }
  &.bottom.inner {
    transform: translateY(220px) rotateX(-90deg) translateZ(59px);
    transform-origin: 50% 50%;
  }
`;

const Horizontal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 340px;
  height: 120px;

  &.left {
    transform: rotateZ(90deg) rotateX(90deg) translateY(-60px);
    transform-origin: 0% 0%;
  }
  &.left.inner {
    transform: rotateZ(90deg) rotateX(90deg) translateY(-60px) translateZ(1px);
    transform-origin: 0% 0%;
  }

  &.right {
    transform: translateX(500px) rotateZ(90deg) rotateX(90deg) translateY(-60px);
    transform-origin: 0% 0%;
  }
  &.right.inner {
    transform: translateX(500px) rotateZ(90deg) rotateX(90deg) translateY(-60px)
      translateZ(-1px);
    transform-origin: 0% 0%;
  }
`;

const Front = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 500px;
  height: 340px;

  &.front {
    transform: translateZ(60px);

    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.front.inner {
    transform: translateZ(59px);
  }

  &.back {
    transform: translateZ(-60px);
    padding: 32px 24px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.back.inner {
    transform: translateZ(-59px);
  }
`;

export default Polaroid;

import styled from "styled-components";

//Body
function Polaroid() {
  return (
    <Wrapper>
      <Block>
        <Front className="front" />
        <Front className="front inner" />
        <Front className="back" />
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

  & > div {
    box-shadow: inset 0 0 60px #f0f0f0;
    background-color: #fff;
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
  border-radius: 16px;

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
  border-radius: 16px;

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
  border-radius: 16px;

  &.front {
    transform: translateZ(60px);
  }
  &.front.inner {
    transform: translateZ(59px);
  }

  &.back {
    transform: translateZ(-60px);
  }
  &.back.inner {
    transform: translateZ(-59px);
  }
`;

export default Polaroid;

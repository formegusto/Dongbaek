import styled from "styled-components";

function Flash() {
  return (
    <Block className="flash">
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
    </Block>
  );
}

const Block = styled.div`
  transform-style: preserve-3d;

  width: 150px;
  height: 80px;

  position: absolute;
  top: 0;
  left: calc(50% - 60px);

  transform: translateY(-65px);

  background-color: transparent !important;

  & > div {
    position: absolute;
    top: 0;
    left: 0;

    background-color: #fff;
    box-shadow: inset 0 0 40px #ccc;
    border-radius: 8px;
  }

  & > .inner {
    background: #ccc;
    box-shadow: none;
  }
`;

const Vertical = styled.div`
  width: 150px;
  height: 60px;

  &.top {
    transform: rotateX(90deg) translateZ(30px);
    transform-origin: 50% 50%;
  }
  &.top.inner {
    transform: rotateX(90deg) translateZ(25px);
    transform-origin: 50% 50%;
  }
`;

const Horizontal = styled.div`
  width: 60px;
  height: 80px;

  &.left {
    transform: rotateY(90deg) translateX(-30px);
    transform-origin: 0% 0%;
  }
  &.left.inner {
    transform: rotateY(90deg) translateX(-30px) translateZ(5px);
    transform-origin: 0% 0%;
  }

  &.right {
    transform: translateX(90px) rotateY(-90deg) translateZ(-30px);
  }
  &.right.inner {
    transform: translateX(90px) rotateY(-90deg) translateZ(-25px);
  }
`;

const Front = styled.div`
  width: 150px;
  height: 80px;

  &.front {
    transform: translateZ(30px);
  }
  &.front.inner {
    transform: translateZ(25px);
  }

  &.back {
    transform: translateZ(-30px);
  }
  &.back.inner {
    transform: translateZ(-25px);
  }
`;

export default Flash;

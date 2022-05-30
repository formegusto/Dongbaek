import styled from "styled-components";

function Flash() {
  return (
    <Block className="flash">
      <Front className="front" />
      <Front className="back" />
      <Horizontal className="left" />
      <Horizontal className="right" />
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
  }
`;

const Horizontal = styled.div`
  width: 60px;
  height: 80px;

  &.left {
    transform: rotateY(90deg) translateX(-30px);
    transform-origin: 0% 0%;
  }

  &.right {
    transform: translateX(90px) rotateY(-90deg) translateZ(-30px);
  }
`;

const Front = styled.div`
  width: 150px;
  height: 80px;

  &.front {
    transform: translateZ(30px);
  }

  &.back {
    transform: translateZ(-30px);
  }
`;

export default Flash;

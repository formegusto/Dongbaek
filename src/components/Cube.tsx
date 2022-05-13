import styled from "styled-components";

function SideSet({ className }: { className: string }) {
  return (
    <>
      <Side className={className} />
      <Side className={`${className} inner`} />
    </>
  );
}
function Cube() {
  return (
    <CubeBlock>
      <SideSet className="front" />
      <SideSet className="top" />
      <SideSet className="left" />
      <SideSet className="right" />
      <SideSet className="bottom" />
      <SideSet className="back" />
      <Side className="cover x" />
      <Side className="cover y" />
      <Side className="cover z" />
    </CubeBlock>
  );
}

const CubeBlock = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  background: #e0e0e0;
  box-shadow: none;

  transform: rotateY(-45deg) rotateX(45deg);
`;

const Side = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background: #fff;
  box-shadow: inset 0 0 40px #ccc;
  border-radius: 40px;

  &.inner {
    background: #e0e0e0;
    box-shadow: none;
  }

  &.front {
    transform: translateZ(100px);
  }
  &.front.inner {
    transform: translateZ(99px);
  }

  &.back {
    transform: rotateX(-180deg) translateZ(100px);
  }
  &.back.inner {
    transform: rotateX(-180deg) translateZ(99px);
  }

  &.right {
    transform: rotateY(90deg) translateZ(100px);
  }
  &.right.inner {
    transform: rotateY(90deg) translateZ(99px);
  }

  &.left {
    transform: rotateY(-90deg) translateZ(100px);
  }
  &.left.inner {
    transform: rotateY(-90deg) translateZ(99px);
  }

  &.top {
    transform: rotateX(90deg) translateZ(100px);
  }
  &.top.inner {
    transform: rotateX(90deg) translateZ(99px);
  }

  &.bottom {
    transform: rotateX(-90deg) translateZ(100px);
  }
  &.bottom.inner {
    transform: rotateX(-90deg) translateZ(99px);
  }

  &.cover {
    border-radius: 0;
    transform: translateZ(0px);

    background: #e0e0e0;
    box-shadow: none;
  }
  &.cover.x {
    transform: rotateY(90deg);
  }
  &.cover.z {
    transform: rotateX(90deg);
  }
`;

export default Cube;

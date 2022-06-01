import React from "react";
import styled from "styled-components";

function MemoryComponent() {
  const refWrapper = React.useRef<HTMLDivElement>(null);
  const refBlock = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (refWrapper && refWrapper.current) {
      refWrapper.current.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (refBlock && refBlock.current)
          refBlock.current!.scrollLeft += e.deltaY;
      });
    }
  });

  React.useEffect(() => {
    if (refBlock && refBlock.current) {
      refBlock.current.addEventListener("scroll", () => {});
    }
  }, []);

  return (
    <Wrapper ref={refWrapper}>
      <Block ref={refBlock}>
        <Line />
      </Block>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  min-width: 800px;
  min-height: 700px;

  background-color: #121212;
`;

const Block = styled.div`
  width: 100vw;
  height: 500px;

  overflow-x: hidden;
  white-space: nowrap;
`;

const Line = styled.div`
  width: 400vw;
  height: 2px;

  background: linear-gradient(45deg, transparent 0%, #fff 100%);
`;

export default MemoryComponent;

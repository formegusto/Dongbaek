import React from "react";
import styled from "styled-components";
import Assets from "../assets";

function MemoryComponent() {
  const refWrapper = React.useRef<HTMLDivElement>(null);
  const refBlock = React.useRef<HTMLDivElement>(null);
  const refListener = React.useRef<HTMLImageElement>(null);

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
      refBlock.current.addEventListener("scroll", (e) => {
        const scrollWidth = refBlock.current!.scrollWidth;
        const width = refBlock.current!.clientWidth;

        const maxScroll = scrollWidth - width;
        const scrollLeft = refBlock.current!.scrollLeft;

        if (refListener && refListener.current) {
          const rate = scrollLeft / maxScroll;
          refListener.current.style.transform =
            "rotateZ(" + 720 * rate + "deg)";
        }
      });

      if (refListener && refListener.current) {
        const { top } = refBlock.current.getBoundingClientRect();
        const { height } = refListener.current.getBoundingClientRect();

        refListener.current.style.top = top - height - 10 + "px";
      }
    }
  }, []);

  return (
    <Wrapper ref={refWrapper}>
      <ScrollListenr
        ref={refListener}
        src={Assets["ScrollListenerX3"]}
        alt="scroll-listener"
      />
      <Block ref={refBlock}>
        <Line />
      </Block>
    </Wrapper>
  );
}

const PaperBlock = styled.div``;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
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
  width: calc(100vw - 48px);
  height: 500px;

  overflow-x: hidden;
  white-space: nowrap;
`;

const ScrollListenr = styled.img`
  position: fixed;
  right: 24px;
  width: 129px;

  transition: 0.1s;
`;

const Line = styled.div`
  width: 400vw;
  height: 2px;

  background: linear-gradient(45deg, transparent 0%, #fff 100%);
`;

export default MemoryComponent;

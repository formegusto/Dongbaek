import React from "react";
import styled from "styled-components";
import Assets from "../assets";

function MemoryComponent() {
  const refWrapper = React.useRef<HTMLDivElement>(null);
  const refBlock = React.useRef<HTMLDivElement>(null);
  const refListener = React.useRef<HTMLImageElement>(null);
  const refList = React.useRef<HTMLDivElement>(null);
  const refLine = React.useRef<HTMLDivElement>(null);

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
        const { top, x } = refBlock.current.getBoundingClientRect();
        const { height, width: lWidth } =
          refListener.current.getBoundingClientRect();
        const width = refBlock.current.offsetWidth;

        refListener.current.style.top = top - height - 10 + "px";
        refListener.current.style.left = x + width - lWidth + "px";

        refListener.current.style.transition = 0.25 + "s";
      }
    }
  }, []);

  React.useEffect(() => {
    if (refList && refList.current) {
      const width = refList.current.scrollWidth;

      if (refLine && refLine.current)
        refLine.current.style.width = width + "px";
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
        <PaperList ref={refList}>
          <Line ref={refLine} />
          <PaperBlock>
            <div className="tong back" />
            <div className="tong front" />
            <PaperContent>
              <div className="img" />
              <input type="text" value="즐거웠던 하루" />
            </PaperContent>
          </PaperBlock>
          <PaperBlock>
            <div className="tong back" />
            <div className="tong front" />
            <PaperContent>
              <div className="img" />
              <input type="text" value="즐거웠던 하루" />
            </PaperContent>
          </PaperBlock>
          <PaperBlock>
            <div className="tong back" />
            <div className="tong front" />
            <PaperContent>
              <div className="img" />
              <input type="text" value="즐거웠던 하루" />
            </PaperContent>
          </PaperBlock>
          <PaperBlock>
            <div className="tong back" />
            <div className="tong front" />
            <PaperContent>
              <div className="img" />
              <input type="text" value="즐거웠던 하루" />
            </PaperContent>
          </PaperBlock>
          <PaperBlock>
            <div className="tong back" />
            <div className="tong front" />
            <PaperContent>
              <div className="img" />
              <input type="text" value="즐거웠던 하루" />
            </PaperContent>
          </PaperBlock>
        </PaperList>
      </Block>
    </Wrapper>
  );
}

const PaperList = styled.div`
  position: relative;
  transform-style: preserve-3d;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  column-gap: 98px;
`;

const PaperContent = styled.div`
  position: relative;
  z-index: 2;

  background-color: #fff;
  padding: 24px 24px 12px;
  border-radius: 8px;

  margin: 64px 0 0;

  & > .img {
    width: 330px;
    height: 220px;

    background-color: #333;
    transform: rotateY(180deg);
  }

  & > input {
    margin: 12px 0 0;
    width: 326px;
    height: 36px;

    font-family: "Nanum Pen Script", cursive !important;

    border: none;

    font-size: 16px;

    outline: none;
  }
`;

const PaperBlock = styled.div`
  overflow-y: visible;
  position: relative;

  width: calc(330px + 48px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;

  & > .tong {
    position: absolute;
    top: 0;
    left: calc(50% - 21px);

    width: 42px;
    height: 80px;

    border-radius: 0px 0px 16px 16px;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    transform-origin: 50% 0%;

    &.back {
      background: #eeeeee;
      z-index: 1;
      /* transform: translateX(3px) rotateX(30deg); */
    }

    &.front {
      background-color: #fff;
      z-index: 3;
      /* transform: rotateX(20deg); */
    }
  }
`;

const Wrapper = styled.div`
  perspective: 800px;
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
  max-width: calc(100vw - 128px);

  overflow-x: hidden;
  white-space: nowrap;
`;

const ScrollListenr = styled.img`
  position: fixed;
  right: 0;
  width: 129px;
`;

const Line = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;

  /* width: 400vw; */

  background: linear-gradient(45deg, transparent 0%, #fff 100%);
`;

export default MemoryComponent;

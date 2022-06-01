import React from "react";
import styled from "styled-components";
import Assets from "../assets";
import { Dongbaek } from "../store/dongbaek/types";
import { ScreenWrapper } from "../styles/Wrapper";
import { BsArrowLeftCircle } from "react-icons/bs";

type Props = {
  dongbaeks?: Dongbaek[];
  onBack: () => void;
};

function MemoryComponent({ dongbaeks, onBack }: Props) {
  const refWrapper = React.useRef<HTMLDivElement>(null);
  const refBlock = React.useRef<HTMLDivElement>(null);
  const refListener = React.useRef<HTMLImageElement>(null);
  const refBackBtn = React.useRef<HTMLButtonElement>(null);
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
    }
  }, []);

  const resizingAdjustPosition = React.useCallback(() => {
    if (refBlock && refBlock.current) {
      if (
        refListener &&
        refListener.current &&
        refBackBtn &&
        refBackBtn.current
      ) {
        const { top, x } = refBlock.current.getBoundingClientRect();

        const width = refBlock.current.offsetWidth;

        refListener.current.style.top = top - 128 - 10 + "px";
        refListener.current.style.left = x + width - 129 + "px";

        refListener.current.style.transition = 0.25 + "s";

        refBackBtn.current.style.top = top - 32 - 24 + "px";
        refBackBtn.current.style.left = x + 12 + "px";
      }
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", resizingAdjustPosition);
    resizingAdjustPosition();

    return () => {
      window.removeEventListener("resize", resizingAdjustPosition);
    };
  }, [resizingAdjustPosition, dongbaeks]);

  React.useEffect(() => {
    if (refList && refList.current) {
      const width = refList.current.scrollWidth;

      if (refLine && refLine.current)
        refLine.current.style.width = width + "px";
    }
  }, [dongbaeks]);

  return (
    <ScreenWrapper ref={refWrapper} flex fixed>
      <BackButton ref={refBackBtn} onClick={onBack}>
        <BsArrowLeftCircle size={32} />
      </BackButton>
      <ScrollListenr
        ref={refListener}
        src={Assets["ScrollListenerX3"]}
        alt="scroll-listener"
      />
      <Block ref={refBlock}>
        <PaperList ref={refList}>
          <Line ref={refLine} />
          {dongbaeks &&
            dongbaeks.map((dongbaek) => (
              <PaperBlock key={dongbaek._id}>
                <div className="tong back" />
                <div className="tong front" />
                <PaperContent>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${dongbaek.image}`}
                    alt={dongbaek.title}
                  />
                  <input type="text" value={dongbaek.title} readOnly />
                </PaperContent>
              </PaperBlock>
            ))}
        </PaperList>
      </Block>
    </ScreenWrapper>
  );
}

const BackButton = styled.button`
  position: fixed;
  left: 0;

  color: rgba(255, 255, 255, 0.2);
  background-color: transparent;
  border: none;

  cursor: pointer;
  transition: 0.25s;

  &:hover,
  &:focus {
    color: rgba(255, 255, 255, 1);
  }

  padding: 0;
`;

const PaperList = styled.div`
  position: relative;
  transform-style: preserve-3d;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  column-gap: 98px;
  height: 370px;
`;

const PaperContent = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  z-index: 2;

  background-color: #fff;
  padding: 24px 24px 12px;
  border-radius: 8px;

  margin: 64px 0 0;

  & > img,
  .img {
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

const Block = styled.div`
  min-width: 360px;
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

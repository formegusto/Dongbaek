import React from "react";
import styled, { keyframes } from "styled-components";
import Assets from "../assets";
import { Dongbaek } from "../store/dongbaek/types";
import { ScreenWrapper } from "../styles/Wrapper";
import { BsArrowLeftCircle, BsEraser } from "react-icons/bs";

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

  const noticeDelete = React.useCallback(
    (e: React.MouseEvent, isEnter: boolean) => {
      const elNotice = e.currentTarget.nextSibling as HTMLDivElement;

      if (elNotice) {
        if (isEnter) elNotice.style.transform = "translateY(92px)";
        else elNotice.style.transform = "";
      }
    },
    []
  );

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
                <div className="tong stick back" />
                <div
                  className="tong stick front"
                  onMouseEnter={(e) => noticeDelete(e, true)}
                  onMouseLeave={(e) => noticeDelete(e, false)}
                />
                <div className={`tong delete notice`}>
                  <BsEraser color="#333" size={32} />
                </div>
                <PaperContent>
                  <div className="img">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/${dongbaek.image}`}
                      alt={dongbaek.title}
                    />
                    <div />
                  </div>
                  <input type="text" value={dongbaek.title} readOnly />
                </PaperContent>
              </PaperBlock>
            ))}
        </PaperList>
      </Block>
    </ScreenWrapper>
  );
}

const PaperAni = keyframes`
  0% {
    transform: rotateZ(0);
  } 25% {
    transform: rotateZ(2.5deg);
  } 50% {
    transform: rotateZ(-2.5deg);
  } 75% {
    transform: rotateZ(2.5deg);
  } 100% {
    transform: rotateZ(0);
  }
`;

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
  overflow-y: visible;
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

  & > .img {
    position: relative;

    width: 330px;
    height: 220px;

    transform: rotateY(180deg);

    & > img {
      display: block;
      position: relative;
      z-index: -1;

      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & > div {
      position: absolute;
      top: 0;
      left: 0;

      width: 330px;
      height: 220px;

      box-shadow: rgba(51, 51, 51, 0.5) 3px 3px 10px inset;
      /* background-color: rgba(51, 51, 51, 0.3); */
    }
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

  transform-origin: 50% 0%;
  animation: ${PaperAni} 1s linear;
  &:hover {
    /* animation: ${PaperAni} 1s linear; */
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
    cursor: pointer;

    &:hover {
      &.front {
        transform: rotateX(30deg);
      }
    }

    &.notice {
      z-index: 3;

      transition: 0.35s;
    }

    &.stick {
      transition: 0.35s;
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
        z-index: 4;
        /* transform: rotateX(20deg); */
      }
    }
  }
`;

const Block = styled.div`
  min-width: 360px;
  max-width: calc(100vw - 128px);
  overflow-x: hidden;
  white-space: nowrap;
  height: 390px;
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

  background: linear-gradient(45deg, transparent 0%, #fff 100%);
`;

export default MemoryComponent;

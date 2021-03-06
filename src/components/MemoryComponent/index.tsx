import React from "react";
import styled from "styled-components";
import Assets from "../../assets";
import { Dongbaek } from "../../store/dongbaek/types";
import { ScreenWrapper } from "../../styles/Wrapper";
import { BsArrowLeftCircle } from "react-icons/bs";
import Paper from "./Paper";
import _ from "underscore";

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

  // vertical scroll에 horizontal로 반응하도록
  React.useEffect(() => {
    if (refWrapper && refWrapper.current) {
      refWrapper.current.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (refBlock && refBlock.current)
          refBlock.current!.scrollLeft += e.deltaY;
      });
    }
  });

  // 스크롤 모니터링 동작
  React.useEffect(() => {
    if (refBlock && refBlock.current) {
      refBlock.current.addEventListener(
        "scroll",
        _.throttle((e) => {
          const scrollWidth = refBlock.current!.scrollWidth;
          const width = refBlock.current!.clientWidth;

          const maxScroll = scrollWidth - width;
          const scrollLeft = refBlock.current!.scrollLeft;

          if (refListener && refListener.current) {
            const rate = scrollLeft / maxScroll;
            refListener.current.style.transform =
              "rotateZ(" + 720 * rate + "deg)";
          }
        }, 100)
      );
    }
  }, []);

  // 윈도운 resizing 발생 시, 뒤로가기 버튼, 심볼의 위치를 다시 잡기 위한 함수
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

  // 사진이 삭제될 경우, 라인의 크기도 같이 작아지게 하기 위한 함수
  const resizingLine = React.useCallback(() => {
    if (refList && refList.current) {
      const width = refList.current.scrollWidth;

      if (refLine && refLine.current) {
        refLine.current.style.width = width + "px";
        console.log(width);
      }
    }
  }, []);

  React.useEffect(() => {
    const debounceResizing = _.debounce(resizingAdjustPosition, 200);
    window.addEventListener("resize", debounceResizing);
    resizingAdjustPosition();

    return () => {
      window.removeEventListener("resize", debounceResizing);
    };
  }, [resizingAdjustPosition, dongbaeks, resizingLine]);

  React.useEffect(() => {
    resizingLine();
  }, [dongbaeks, resizingLine]);

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
        <PaperList className="paper list">
          <Line ref={refLine} />
          <ListBlock ref={refList}>
            {dongbaeks &&
              dongbaeks.map((dongbaek) => (
                <Paper
                  dongbaek={dongbaek}
                  key={dongbaek._id}
                  resizingLine={resizingLine}
                />
              ))}
          </ListBlock>
        </PaperList>
      </Block>
    </ScreenWrapper>
  );
}

const ListBlock = styled.div`
  transform-style: preserve-3d;
  overflow-y: visible;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  column-gap: 98px;
  height: 370px;

  transition: 0.3s;
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

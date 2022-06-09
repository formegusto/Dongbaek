import { inject, observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import RootStore from "../../store";
import DongbaekStore from "../../store/dongbaek";
import UIStore from "../../store/ui";

type Props = {
  dongbaekStore?: DongbaekStore;
  uiStore?: UIStore;
};

// 첫 사진 촬영 시, printing 되는 애니메이션용 컴포넌트
function Printing({ dongbaekStore, uiStore }: Props) {
  const refPaper = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (uiStore?.setPreview) {
      if (refPaper && refPaper.current) {
        refPaper.current.addEventListener("transitionend", () => {
          const classNames = refPaper.current?.classList;
          if (classNames?.contains("printing-end")) {
            refPaper.current?.classList.remove("printing-end");
            uiStore?.setPreview(true);
          } else if (classNames?.contains("printing")) {
            refPaper.current?.classList.remove("printing");
            refPaper.current?.classList.add("printing-end");
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (dongbaekStore?.image && refPaper && refPaper.current)
      refPaper.current.classList.add("printing");
  }, [dongbaekStore?.image]);

  return (
    <Block>
      <Paper ref={refPaper}>
        <Shadow />
        <CaptureFigure className={uiStore?.filter.className}>
          <CaptureCanvas id="capture-canvas" />
        </CaptureFigure>
      </Paper>
      <PrintingShape />
    </Block>
  );
}

const Shadow = styled.div`
  position: absolute;
  z-index: 2;
  top: 24px;
  left: 18px;

  width: 304px;
  height: 200px;

  box-shadow: rgba(51, 51, 51, 0.5) 3px 3px 10px inset;
  transition: 0.25s;
`;

const CaptureFigure = styled.figure`
  width: 304px;
  height: 200px;
`;

const CaptureCanvas = styled.canvas`
  width: 304px;
  height: 200px;
`;

const Block = styled.div`
  position: absolute;
  bottom: 0;
  right: 24px;

  width: 340px;
  height: 272px;

  transform-style: preserve-3d;
`;

const Paper = styled.div`
  display: flex;
  justify-content: center;

  width: 340px;
  height: 272px;

  box-sizing: border-box;
  background-color: #fff;

  padding: 24px 0 0;

  /* transform: translateY(269px); */
  border-radius: 16px;

  transition: 0s;

  &.printing {
    transition: 5s;
    transform: translateY(269px);
  }

  &.printing-end {
    transition: 0.3s;
    transform: translateY(100vh);
  }
`;

const PrintingShape = styled.div`
  width: 340px;
  height: 6px;

  border-radius: 3px;

  position: absolute;
  bottom: 0;
  right: 0;

  transform: rotateX(90deg) translateY(3px);
  transform-origin: 50% 100%;

  background-color: #121212;
`;

export default inject((store: RootStore) => ({
  dongbaekStore: store.dongbaek,
  uiStore: store.ui,
}))(observer(Printing));

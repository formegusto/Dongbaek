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
    console.log(dongbaekStore?.image);
    if (dongbaekStore?.image && refPaper && refPaper.current)
      refPaper.current.classList.add("printing");
  }, [dongbaekStore?.image]);

  return (
    <Block>
      <Paper ref={refPaper}>
        <CaptureCanvas id="capture-canvas" />
      </Paper>
      <PrintingShape />
    </Block>
  );
}

const CaptureCanvas = styled.canvas`
  width: 304px;
  height: 220px;
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
    transform: translateY(750px);
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
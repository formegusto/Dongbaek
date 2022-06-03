import { inject, observer } from "mobx-react";
import React from "react";
import styled, { keyframes } from "styled-components";
import RootStore from "../../store";
import DongbaekStore from "../../store/dongbaek";
import Timer from "./Timer";

type Props = {
  dongbaekStore?: DongbaekStore;
  refVideo: React.RefObject<HTMLVideoElement>;
  timer?: number;
};

function Shutter({ dongbaekStore, refVideo, timer }: Props) {
  const [showTimer, setShowTimer] = React.useState<boolean>(false);
  const onCapture = React.useCallback(() => {
    if (timer !== 0 && !showTimer) {
      setShowTimer(true);
      return;
    }

    const canvas = document.getElementById(
      "capture-canvas"
    ) as HTMLCanvasElement;

    if (canvas && refVideo && refVideo.current) {
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(refVideo.current, 0, 0, 304, 200);

      canvas.toBlob((blob) => {
        dongbaekStore?.capture(blob);
        setShowTimer(false);
      }, "image/png");
    }
  }, [dongbaekStore, refVideo, showTimer, timer]);

  return (
    <Block>
      <Button
        className={showTimer ? "timering" : ""}
        onClick={showTimer ? undefined : onCapture}
      />
      {showTimer && timer !== 0 ? (
        <Timer initTimer={timer!} action={onCapture} />
      ) : (
        <></>
      )}
    </Block>
  );
}

const Block = styled.div`
  position: relative;
  width: 48px;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #333;
  border-radius: 100%;
`;

const AniTimerLoading = keyframes`
  from {
    transform: rotateZ(0deg);
  } to {
    transform: rotateZ(360deg);
  }
`;

const Button = styled.button`
  position: relative;
  width: 42px;
  background: transparent;
  height: 42px;

  cursor: pointer;

  border-radius: 100%;
  background-color: #333;
  border: none;
  transition: 0.3s;

  &.timering {
    background-color: #fff;
    border-top: 2px solid #333;

    animation: ${AniTimerLoading} 1s infinite linear;
  }

  &:hover {
    opacity: 0.7;
  }
`;

export default inject((store: RootStore) => ({
  dongbaekStore: store.dongbaek,
  timer: store.ui.timer,
}))(observer(Shutter));

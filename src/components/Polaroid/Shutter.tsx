import { inject, observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import RootStore from "../../store";
import DongbaekStore from "../../store/dongbaek";

type Props = {
  dongbaekStore?: DongbaekStore;
  refVideo: React.RefObject<HTMLVideoElement>;
};

function Shutter({ dongbaekStore, refVideo }: Props) {
  const onCapture = React.useCallback(() => {
    const canvas = document.getElementById(
      "capture-canvas"
    ) as HTMLCanvasElement;

    if (canvas && refVideo && refVideo.current) {
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(refVideo.current, 0, 0, 304, 200);

      canvas.toBlob((blob) => {
        dongbaekStore?.capture(blob);
      }, "image/png");
    }
  }, [dongbaekStore, refVideo]);

  return <Button onClick={onCapture} />;
}

const Button = styled.button`
  position: relative;
  width: 48px;
  background: transparent;
  height: 48px;

  border: 1px solid #333;
  border-radius: 100%;

  cursor: pointer;

  &::after {
    content: "";
    transition: 0.3s;
    position: absolute;
    top: calc(50% - 21px);
    left: calc(50% - 21px);
    width: 42px;
    height: 42px;
    border-radius: 100%;
    background-color: #333;
  }

  &:hover {
    &::after {
      opacity: 0.7;
    }
  }
`;

export default inject((store: RootStore) => ({
  dongbaekStore: store.dongbaek,
}))(observer(Shutter));

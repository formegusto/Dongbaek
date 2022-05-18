import React from "react";
import styled from "styled-components";

function CanvasCapture() {
  const captureBox = React.useRef<HTMLDivElement>(null);
  const refCanvas = React.useRef<HTMLCanvasElement>(null);

  const onCapture = React.useCallback(() => {
    if (refCanvas && refCanvas.current) {
      if (captureBox && captureBox.current) {
        const ctx = refCanvas.current.getContext("2d");

        ctx?.drawImage(captureBox.current as any, 0, 0, 300, 200);
        const data = refCanvas.current.toDataURL("image/png");

        console.log(data);
      }
    }
  }, []);

  return (
    <>
      <Block>
        <Target ref={captureBox}>캡처본</Target>
        <Canvas ref={refCanvas} width={300} height={200} />
      </Block>
      <button onClick={onCapture}>캡쳐</button>
    </>
  );
}

const Block = styled.div`
  position: relative;

  & > * {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Canvas = styled.canvas``;

const Target = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 200px;

  border: 1px solid #fff;
  box-sizing: border-box;
`;

export default CanvasCapture;

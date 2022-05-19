import React from "react";
import { blob } from "stream/consumers";
import styled from "styled-components";
import testImage from "../assets/test.png";

function CanvasCapture() {
  const refCaptureImg = React.useRef<HTMLImageElement>(null);
  const refCanvas = React.useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);

  const onCapture = React.useCallback(() => {
    if (refCanvas && refCanvas.current) {
      const ctx = refCanvas.current.getContext("2d");

      ctx?.drawImage(refCaptureImg.current as any, 0, 0, 300, 200);
      refCanvas.current.toBlob((blob) => {
        if (blob) {
          console.log(blob);
          setImgSrc(URL.createObjectURL(blob));
        }
      });
    }
  }, []);

  return (
    <>
      <Block>
        <Target ref={refCaptureImg} src={testImage} />
        <Canvas ref={refCanvas} width={300} height={200} />
        {imgSrc && <Drawing src={imgSrc} />}
      </Block>
      <button onClick={onCapture}>캡쳐</button>
    </>
  );
}

const Block = styled.div`
  position: relative;
`;

const Canvas = styled.canvas``;

const Drawing = styled.img`
  width: 300px;
  height: 200px;

  border: 1px solid #fff;
  box-sizing: border-box;
`;

const Target = styled.img`
  width: 300px;
  height: 200px;

  border: 1px solid #fff;
  box-sizing: border-box;
`;

export default CanvasCapture;

import { inject, observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import testImage from "../assets/test.png";
import RootStore from "../store";
import DongbaekStore from "../store/dongbaek";

type Props = {
  store?: DongbaekStore;
};

function CanvasCapture({ store }: Props) {
  const refCaptureImg = React.useRef<HTMLImageElement>(null);
  const refCanvas = React.useRef<HTMLCanvasElement>(null);
  const [imgBlob, setImgBlob] = React.useState<Blob | null>(null);
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (imgBlob) {
      console.log(imgBlob);
    }
  }, [imgBlob]);

  const onSubmit = React.useCallback(async () => {
    if (imgBlob) {
      const formData = new FormData();

      formData.append("title", "Test");
      formData.append("image", imgBlob);

      store?.post(formData);
    }
  }, [imgBlob, store]);

  const onCapture = React.useCallback(() => {
    if (refCanvas && refCanvas.current) {
      const ctx = refCanvas.current.getContext("2d");

      ctx?.drawImage(refCaptureImg.current as any, 0, 0, 300, 200);
      refCanvas.current.toBlob((blob) => {
        setImgBlob(blob);
        if (blob) setImgSrc(URL.createObjectURL(blob));
      }, "image/png");
    }
  }, []);

  return (
    <>
      <Block>
        <Target ref={refCaptureImg} src={testImage} />
        <Canvas ref={refCanvas} width={300} height={200} />
        {imgSrc && <Drawing src={imgSrc} />}
      </Block>
      <ButtonBlock>
        <button onClick={onCapture}>캡쳐</button>
        {imgBlob && <button onClick={onSubmit}>전송</button>}
      </ButtonBlock>
    </>
  );
}

const Block = styled.div`
  position: relative;
`;

const ButtonBlock = styled.div`
  display: flex;

  flex-direction: row;
  justify-content: center;
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

export default inject((store: RootStore) => ({
  store: store.dongbaek,
}))(observer(CanvasCapture));

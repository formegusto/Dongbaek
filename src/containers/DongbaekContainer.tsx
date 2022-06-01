import { inject, observer } from "mobx-react";
import React from "react";
import DongbaekComponent from "../components/DongbaekComponent";
import RootStore from "../store";

type Props = {
  setStream?: (stream: MediaStream) => void;
  stream?: MediaStream;
};

function DongbaekContainer({ setStream, stream }: Props) {
  React.useEffect(() => {
    if (stream) {
      const elStream = document.getElementById(
        "dongbaek-stream"
      ) as HTMLVideoElement;
      if (elStream) elStream.srcObject = stream;
    } else {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          setStream!(stream);
        });
    }
  }, [stream, setStream]);

  return stream ? <DongbaekComponent /> : <></>;
}

export default inject((store: RootStore) => ({
  setStream: store.ui.setStream,
  stream: store.ui.stream,
}))(observer(DongbaekContainer));

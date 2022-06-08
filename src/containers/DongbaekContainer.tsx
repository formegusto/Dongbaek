import { inject, observer } from "mobx-react";
import React from "react";
import DongbaekComponent from "../components/DongbaekComponent";
import RootStore from "../store";
import { Authorization } from "../store/auth/types";

type Props = {
  setStream?: (stream: MediaStream) => void;
  stream?: MediaStream;
  auth?: Authorization;
};

function DongbaekContainer({ setStream, stream, auth }: Props) {
  // Web Cam을 띄우기 위한 준비를 한다.
  React.useEffect(() => {
    if (auth) {
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
    }
  }, [stream, setStream, auth]);

  return stream ? <DongbaekComponent /> : <></>;
}

export default inject<RootStore, Props, Props, {}>((store) => ({
  setStream: store.ui.setStream,
  stream: store.ui.stream,
  auth: store.auth.auth,
}))(observer(DongbaekContainer));

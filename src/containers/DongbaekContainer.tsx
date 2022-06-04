import { inject, observer } from "mobx-react";
import React from "react";
import DongbaekComponent from "../components/DongbaekComponent";
import Preview from "../components/Preview";
import RootStore from "../store";
import { Authorization } from "../store/auth/types";
import DongbaekStore from "../store/dongbaek";

type Props = {
  setStream?: (stream: MediaStream) => void;
  stream?: MediaStream;
  auth?: Authorization;
  dongbaekStore?: DongbaekStore;
};

function DongbaekContainer({ setStream, stream, auth, dongbaekStore }: Props) {
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

export default inject((store: RootStore) => ({
  setStream: store.ui.setStream,
  stream: store.ui.stream,
  auth: store.auth.auth,
  dongbaekStore: store.dongbaek,
}))(observer(DongbaekContainer));

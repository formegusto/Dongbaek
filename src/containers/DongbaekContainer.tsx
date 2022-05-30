import { inject, observer } from "mobx-react";
import React from "react";
import DongbaekComponent from "../components/DongbaekComponent";
import RootStore from "../store";
import DongbaekStore from "../store/dongbaek";

type Props = {
  store?: DongbaekStore;
  stream?: MediaStream;
};

function DongbaekContainer({ stream }: Props) {
  React.useEffect(() => {
    if (stream) {
      const elStream = document.getElementById(
        "dongbaek-stream"
      ) as HTMLVideoElement;
      if (elStream) elStream.srcObject = stream;
    }
  }, [stream]);

  return stream ? <DongbaekComponent /> : <></>;
}

export default inject((store: RootStore) => ({
  store: store.dongbaek,
  stream: store.ui.stream,
}))(observer(DongbaekContainer));

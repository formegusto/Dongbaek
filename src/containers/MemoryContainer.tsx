import { inject, observer } from "mobx-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import MemoryComponent from "../components/MemoryComponent";
import RootStore from "../store";
import DongbaekStore from "../store/dongbaek";

type Props = {
  dongbaekStore?: DongbaekStore;
};

function MemoryContainer({ dongbaekStore }: Props) {
  const navigate = useNavigate();

  React.useEffect(() => {
    dongbaekStore?.getList();
  }, [dongbaekStore]);

  const onBack = React.useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <MemoryComponent dongbaeks={dongbaekStore?.dongbaekList} onBack={onBack} />
  );
}

export default inject((store: RootStore) => ({
  dongbaekStore: store.dongbaek,
}))(observer(MemoryContainer));

import { observer, inject } from "mobx-react";
import RootStore from "../store";
import CountStore from "../store/count";

type Props = {
  count?: CountStore;
};

function CountComponent({ count }: Props) {
  return (
    <>
      <h1
        style={{
          fontSize: "48px",
          fontWeight: 900,
        }}
      >
        {count?.count}
      </h1>
      <div>
        <button onClick={count?.decrease}>-</button>
        <button onClick={count?.increase}>+</button>
      </div>
    </>
  );
}

export default inject((store: RootStore) => ({
  ...store,
}))(observer(CountComponent));

import React from "react";
import FilterContainer from "../containers/FilterContainer";

function FilterPage() {
  React.useEffect(() => {
    const elStream = document.getElementById(
      "dongbaek-stream"
    ) as HTMLVideoElement;

    if (elStream) {
      const rect = elStream.getClientRects();
      console.log(rect);
    }
  }, []);

  return <FilterContainer />;
}

export default FilterPage;

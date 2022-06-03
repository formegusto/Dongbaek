import React from "react";
import styled from "styled-components";
import { ScreenWrapper } from "../styles/Wrapper";
import Polaroid from "./Polaroid";
import _ from "underscore";

function DongbaekComponent() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollThrottle = React.useCallback(
    _.throttle(() => {
      const elPolaroid = document.getElementById(
        "polaroid-block"
      ) as HTMLDivElement;

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const rate = window.scrollY / maxScroll;

      elPolaroid.style.transform = "rotateY(" + -360 * rate + "deg)";
    }, 75),
    []
  );

  React.useEffect(() => {
    window.addEventListener("scroll", scrollThrottle);

    return () => {
      window.removeEventListener("scroll", scrollThrottle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ScrollListener />
      <ScreenWrapper flex fixed>
        <Polaroid />
      </ScreenWrapper>
    </>
  );
}

const ScrollListener = styled.div`
  width: 100vw;
  height: 300vh;
`;

export default DongbaekComponent;

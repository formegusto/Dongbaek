import React from "react";
import styled from "styled-components";
import { ScreenWrapper } from "../styles/Wrapper";
import Polaroid from "./Polaroid";
import _ from "underscore";

function DongbaekComponent() {
  // throttle function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollThrottle = React.useCallback(
    _.throttle(() => {
      // console.log("throttle");
      const elPolaroid = document.getElementById(
        "polaroid-block"
      ) as HTMLDivElement;

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const rate = window.scrollY / maxScroll;

      elPolaroid.style.transform = "rotateY(" + -360 * rate + "deg)";
    }, 100),
    []
  );

  // Test 용
  const nonThrottle = React.useCallback(() => {
    // console.log("non Throttle");
    const elPolaroid = document.getElementById(
      "polaroid-block"
    ) as HTMLDivElement;

    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const rate = window.scrollY / maxScroll;

    elPolaroid.style.transform = "rotateY(" + -360 * rate + "deg)";
  }, []);

  React.useEffect(() => {
    window.addEventListener("scroll", scrollThrottle);

    return () => {
      window.removeEventListener("scroll", scrollThrottle);
    };
  }, [scrollThrottle, nonThrottle]);

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

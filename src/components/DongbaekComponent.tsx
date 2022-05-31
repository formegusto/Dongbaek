import React from "react";
import styled from "styled-components";
import { ScreenWrapper } from "../styles/Wrapper";
import Polaroid from "./Polaroid";

function DongbaekComponent() {
  React.useEffect(() => {
    const elPolaroid = document.getElementById(
      "polaroid-block"
    ) as HTMLDivElement;

    if (elPolaroid) {
      window.onscroll = (e) => {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const rate = window.scrollY / maxScroll;

        elPolaroid.style.transform = "rotateY(" + -360 * rate + "deg)";
      };
    }
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
  height: 2000px;
`;

export default DongbaekComponent;

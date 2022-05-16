import React from "react";
import styled, { css } from "styled-components";

const ITEMS = Array.from({ length: 10 });

function Carousel() {
  const [nowIdx, setNowIdx] = React.useState<number>(0);
  const refCarousel = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (refCarousel && refCarousel.current) {
      const nowPosition = nowIdx * 336 * -1 + 336;
      refCarousel.current.style.transform = "translate(" + nowPosition + "px)";
    }
  }, [nowIdx]);

  const nextItem = React.useCallback((idx: number) => {
    setNowIdx(idx);
  }, []);

  const prevItem = React.useCallback((idx: number) => {
    setNowIdx(idx);
  }, []);

  return (
    <Block>
      <CarouselBlock ref={refCarousel}>
        {ITEMS.map((item, idx) => (
          <CarouselItem
            key={idx}
            isNow={nowIdx === idx}
            next={nowIdx + 1 === idx || nowIdx - 1 === idx}
            onClick={
              nowIdx + 1 === idx
                ? () => nextItem(idx)
                : nowIdx - 1 === idx
                ? () => prevItem(idx)
                : undefined
            }
          />
        ))}
      </CarouselBlock>
    </Block>
  );
}

const Block = styled.div`
  width: calc(336px * 3);
  height: 216px;

  overflow-x: hidden;
`;

const CarouselBlock = styled.div`
  width: calc(336px * 12);
  height: 216px;
  transition: 0.3s;
`;

type ItemProps = {
  isNow: boolean;
  next: boolean;
};

const CarouselItem = styled.div<ItemProps>`
  display: inline-block;
  width: 336px;
  height: 216px;

  background-color: #fff;

  transition: 0.3s;

  ${(props) =>
    !props.isNow &&
    css`
      transform: scale(0.75, 0.75);
    `}

  ${(props) =>
    props.next &&
    css`
      cursor: pointer;
    `}
`;

export default Carousel;

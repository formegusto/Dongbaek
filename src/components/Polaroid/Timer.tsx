import React from "react";
import styled, { keyframes } from "styled-components";

type Props = {
  initTimer: number;
  action: (...params: any) => void;
};

function Timer({ initTimer, action }: Props) {
  const [timer, setTimer] = React.useState<number>(initTimer);
  const refTimer = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (initTimer > 0) {
      setTimeout(() => {
        const nextTimer = timer - 1;
        setTimer(nextTimer);
        if (refTimer && refTimer.current) {
          const elNumber = document.createElement("span");
          elNumber.className = "number";
          elNumber.textContent = nextTimer + "";

          if (nextTimer === 0) {
            elNumber.addEventListener("animationend", () => {
              refTimer.current?.removeChild(elNumber);
              action();
            });
          } else {
            elNumber.addEventListener("animationend", () => {
              refTimer.current?.removeChild(elNumber);
            });
          }
          refTimer.current.appendChild(elNumber);
        }
      }, 1000);
    }
  }, [timer, action, initTimer]);

  return <Block ref={refTimer}></Block>;
}

const AniNumber = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.6);
    } 70% {
        opacity: 1;
        transform: scale(1);
    } 100% {
        opacity: 0;
        transform: scale(1);
    }
`;
const Block = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 100;
  font-size: 20px;

  & > .number {
    position: absolute;
    animation: ${AniNumber} 1s linear forwards;
  }
`;

export default Timer;

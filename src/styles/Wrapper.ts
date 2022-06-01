import styled, { css, keyframes } from "styled-components";

type Props = {
  flex?: boolean;
  fixed?: boolean;
};

const AniScreen = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

export const ScreenWrapper = styled.div<Props>`
  width: 100vw;
  height: 100vh;

  min-width: 800px;
  min-height: 700px;

  overflow-y: scroll;

  animation: ${AniScreen} 0.75s linear forwards;

  ${(props) =>
    props.flex &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}

  ${(props) =>
    props.fixed &&
    css`
      position: fixed;
      top: 0;
      left: 0;
    `}
`;

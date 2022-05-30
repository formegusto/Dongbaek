import styled, { css } from "styled-components";

type Props = {
  flex?: boolean;
  fixed?: boolean;
};

export const ScreenWrapper = styled.div<Props>`
  width: 100vw;
  height: 100vh;

  min-width: 800px;
  min-height: 700px;

  overflow-y: scroll;

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

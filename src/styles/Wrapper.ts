import styled, { css } from "styled-components";

type Props = {
  flex?: boolean;
};

export const ScreenWrapper = styled.div<Props>`
  width: 100vw;
  height: 100vh;

  min-width: 800px;
  min-height: 700px;

  ${(props) =>
    props.flex &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

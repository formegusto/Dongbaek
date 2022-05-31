import { inject, observer } from "mobx-react";
import React from "react";
import styled, { keyframes } from "styled-components";
import RootStore from "../store";
import DongbaekStore from "../store/dongbaek";
import UIStore from "../store/ui";

type Props = {
  uiStore?: UIStore;
  dongbaekStore?: DongbaekStore;
};

function Preview({ uiStore, dongbaekStore }: Props) {
  const onClose = React.useCallback(() => {
    uiStore?.setPreview(false);
    dongbaekStore?.clearImage();
  }, [uiStore, dongbaekStore]);

  return uiStore?.viewPreview ? (
    <Container>
      <Close onClick={onClose} />
      <Paper>
        {dongbaekStore?.image && (
          <img src={dongbaekStore?.image!} alt="pure one day" />
        )}
        <input type="text" placeholder="어떤 하루 였나요?" />
      </Paper>
    </Container>
  ) : (
    <></>
  );
}

const AniContainer = keyframes`
    from {
        opacity: 0;
    } to {
        opacity: 1;
    }
`;

const Close = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(51, 51, 51, 0.6);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  animation: ${AniContainer} 0.75s linear forwards;
`;

const Paper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  padding: 24px 24px 12px;

  background-color: #fff;
  border-radius: 8px;

  & > img {
    width: 330px;
    height: 220px;

    transform: rotateY(180deg);

    object-fit: cover;
  }

  & > input {
    margin: 12px 0 0;
    width: 326px;
    height: 36px;

    font-family: "Nanum Pen Script", cursive !important;

    border: none;

    font-size: 16px;

    outline: none;
  }
`;

export default inject((store: RootStore) => ({
  uiStore: store.ui,
  dongbaekStore: store.dongbaek,
}))(observer(Preview));

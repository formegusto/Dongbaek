import { inject, observer } from "mobx-react";
import React from "react";
import styled, { keyframes } from "styled-components";
import RootStore from "../store";
import DongbaekStore from "../store/dongbaek";
import UIStore from "../store/ui";
import { BsX, BsFilm } from "react-icons/bs";

type Props = {
  uiStore?: UIStore;
  dongbaekStore?: DongbaekStore;
};

function Preview({ uiStore, dongbaekStore }: Props) {
  const [title, setTitle] = React.useState<string>("");
  const refContent = React.useRef<HTMLDivElement>(null);

  const onClose = React.useCallback(() => {
    uiStore?.setPreview(false);
    dongbaekStore?.clearImage();
    setTitle("");
  }, [uiStore, dongbaekStore]);

  const onSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (refContent && refContent.current) {
        const tongFront = document.createElement("div");
        const tongBack = document.createElement("div");

        tongFront.className = "tong stick front";
        tongBack.className = "tong stick back";

        refContent.current.appendChild(tongFront);
        refContent.current.appendChild(tongBack);

        tongFront.addEventListener("animationend", () => {
          dongbaekStore?.post(title);
          setTitle("");
          onClose();
        });
      }
    },
    [dongbaekStore, title, onClose]
  );

  return uiStore?.viewPreview ? (
    <Container>
      {/* <Close onClick={onClose} /> */}
      <Close />
      <PaperContent ref={refContent}>
        <Paper onSubmit={onSubmit}>
          <figure className={uiStore?.filter.className}>
            {dongbaekStore?.image && (
              <img src={dongbaekStore?.image!} alt="pure one day" />
            )}
          </figure>
          <input
            type="text"
            placeholder="소중한 이야기를 적어주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ButtonGroup>
            <li>
              <Button type="submit">
                <BsFilm size={24} />
              </Button>
            </li>
            <li>
              <Button className="close" onClick={onClose}>
                <BsX size={24} />
              </Button>
            </li>
          </ButtonGroup>
        </Paper>
      </PaperContent>
    </Container>
  ) : (
    <></>
  );
}

const AniTongFront = keyframes`
  from {
    transform: rotateX(60deg);
    /* opacity: 0; */
  } to {
    transform: rotateX(0);
    /* opacity: 1; */
  }
`;

const AniTongBack = keyframes`
  from {
    transform: translateX(3px) rotateX(-60deg);
    /* opacity: 0; */
  } to {
    transform: translateX(3px) rotateX(0);
    /* opacity: 1; */
  }
`;

const PaperContent = styled.div`
  position: relative;
  overflow-x: visible;
  perspective: 800px;

  width: 378px;
  height: 307px;

  & > .tong {
    position: absolute;
    top: 0;

    &.stick {
      top: -64px;
      left: calc(50% - 21px);
      width: 42px;
      height: 80px;

      border-radius: 0px 0px 16px 16px;

      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

      transform-origin: 50% 0%;
      &.back {
        background: #eeeeee;
        z-index: 1;
        transform: translateX(3px);
        animation: ${AniTongBack} 1s linear forwards;
      }

      &.front {
        background-color: #fff;
        z-index: 3;
        animation: ${AniTongFront} 1s linear forwards;
      }
    }
  }
`;

const AniContainer = keyframes`
    from {
        opacity: 0;
    } to {
        opacity: 1;
    }
`;

const Close = styled.div`
  position: fixed;
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

const ButtonGroup = styled.ul`
  position: absolute;
  top: -36px;
  right: 0;

  display: flex;
  flex-direction: row;

  column-gap: 8px;
`;

const Button = styled.button`
  background-color: transparent;

  border: 1px solid #fff;
  color: #fff;

  border-radius: 100%;

  width: 32px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  transition: 0.35s;
  &:hover {
    color: #333;
    background-color: #fff;
  }
`;

const Paper = styled.form`
  position: relative;
  overflow-x: visible;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  padding: 24px 24px 12px;

  background-color: #fff;
  border-radius: 8px;

  z-index: 2;

  & > figure {
    & > img {
      width: 330px;
      height: 220px;

      transform: rotateY(180deg);

      object-fit: cover;
    }
  }

  & > input {
    margin: 12px 0 0;
    width: 326px;
    height: 36px;

    font-family: "Nanum Pen Script", cursive !important;

    border: none;

    font-size: 20px;

    outline: none;
  }
`;

export default inject((store: RootStore) => ({
  uiStore: store.ui,
  dongbaekStore: store.dongbaek,
}))(observer(Preview));

import styled, { keyframes } from "styled-components";
import { Dongbaek } from "../../store/dongbaek/types";
import { BsEraser } from "react-icons/bs";
import React from "react";

type Props = {
  dongbaek: Dongbaek;
};

function Paper({ dongbaek }: Props) {
  const [title, setTitle] = React.useState<string>(dongbaek.title);
  const refErase = React.useRef<HTMLDivElement>(null);
  const refShadow = React.useRef<HTMLDivElement>(null);

  const noticeDelete = React.useCallback(
    (e: React.MouseEvent, isEnter: boolean) => {
      if (refErase && refErase.current && refShadow && refShadow.current) {
        if (isEnter) {
          refErase.current.style.transform = "translateY(" + (218 - 33) + "px)";
          refShadow.current.style.background = "rgba(51,51,51, 0.5)";
        } else {
          refErase.current.style.transform = "";
          refShadow.current.style.background = "";
        }
      }
    },
    []
  );

  return (
    <PaperBlock key={dongbaek._id}>
      <div className="tong stick back" />
      <div
        className="tong stick front"
        onMouseEnter={(e) => noticeDelete(e, true)}
        onMouseLeave={(e) => noticeDelete(e, false)}
      />
      <div className={`tong delete notice`} ref={refErase}>
        <BsEraser color="#fff" size={32} />
      </div>
      <PaperContent>
        <div className="dongbaek">
          <figure>
            <img
              src={`${process.env.REACT_APP_API_URL}/${dongbaek.image}`}
              alt={dongbaek.title}
            />
          </figure>
          <div className="shadow" ref={refShadow} />
        </div>
        <input type="text" value={title} />
      </PaperContent>
    </PaperBlock>
  );
}

const PaperAni = keyframes`
  0% {
    transform: rotateZ(0);
  } 25% {
    transform: rotateZ(2.5deg);
  } 50% {
    transform: rotateZ(-2.5deg);
  } 75% {
    transform: rotateZ(2.5deg);
  } 100% {
    transform: rotateZ(0);
  }
`;

const PaperContent = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  z-index: 2;

  background-color: #fff;
  padding: 24px 24px 12px;
  border-radius: 8px;

  margin: 64px 0 0;

  & > .dongbaek {
    position: relative;

    width: 330px;
    height: 220px;

    transform: rotateY(180deg);

    figure > {
      display: block;
      position: relative;
      z-index: -1;
    }
    & > figure > img {
      width: 330px;
      height: 220px;

      object-fit: cover;
    }

    & > div {
      position: absolute;
      top: 0;
      left: 0;

      width: 330px;
      height: 220px;

      box-shadow: rgba(51, 51, 51, 0.5) 3px 3px 10px inset;
      transition: 0.25s;
      /* background-color: rgba(51, 51, 51, 0.3); */
    }
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

  transform-origin: 50% 0%;
  animation: ${PaperAni} 1s linear;
  &:hover {
    /* animation: ${PaperAni} 1s linear; */
  }
`;

const PaperBlock = styled.div`
  overflow-y: visible;
  position: relative;

  width: calc(330px + 48px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;

  & > .tong {
    position: absolute;
    top: 0;
    cursor: pointer;

    &:hover {
      &.front {
        transform: rotateX(30deg);
      }
    }

    &.notice {
      z-index: 3;

      transition: 0.35s;
    }

    &.stick {
      transition: 0.35s;
      left: calc(50% - 21px);
      width: 42px;
      height: 80px;

      border-radius: 0px 0px 16px 16px;

      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

      transform-origin: 50% 0%;
      &.back {
        background: #eeeeee;
        z-index: 1;
        /* transform: translateX(3px) rotateX(30deg); */
      }

      &.front {
        background-color: #fff;
        z-index: 4;
        /* transform: rotateX(20deg); */
      }
    }
  }
`;

export default Paper;

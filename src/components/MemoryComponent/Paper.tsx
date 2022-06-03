import styled, { keyframes } from "styled-components";
import { Dongbaek } from "../../store/dongbaek/types";
import { BsEraser } from "react-icons/bs";
import React from "react";
import { inject } from "mobx-react";
import RootStore from "../../store";
import { observer } from "mobx-react-lite";
import DongbaekStore from "../../store/dongbaek";
import _ from "underscore";

type Props = {
  dongbaekStore?: DongbaekStore;
  dongbaek: Dongbaek;
};

function Paper({ dongbaekStore, dongbaek }: Props) {
  const [title, setTitle] = React.useState<string>(dongbaek.title);
  const refErase = React.useRef<HTMLDivElement>(null);
  const refShadow = React.useRef<HTMLDivElement>(null);
  const refBlock = React.useRef<HTMLDivElement>(null);
  const refContent = React.useRef<HTMLDivElement>(null);

  const debouncePatch = React.useRef<(_id: string, title: string) => void>(
    _.debounce((_id: string, _title: string) => {
      dongbaekStore?.patch(_id, _title);
    }, 500)
  );

  const onChangeTitle = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      if (debouncePatch && debouncePatch.current)
        debouncePatch.current(dongbaek._id, e.target.value);
    },
    [dongbaek, debouncePatch]
  );

  const noticeDelete = React.useCallback((isEnter: boolean) => {
    if (refErase && refErase.current && refShadow && refShadow.current) {
      if (isEnter) {
        refErase.current.style.transform = "translateY(" + (218 - 33) + "px)";
        refShadow.current.style.background = "rgba(51,51,51, 0.5)";
      } else {
        refErase.current.style.transform = "";
        refShadow.current.style.background = "";
      }
    }
  }, []);

  React.useEffect(() => {
    if (dongbaek.deleteStatus) {
      if (refContent && refContent.current) {
        refContent.current.classList.add("deleting");
      }
    }
  }, [dongbaek]);

  React.useEffect(() => {
    if (refContent && refContent.current) {
      refContent.current.addEventListener(
        "animationend",
        (e) => {
          if (refContent && refContent.current) {
            if (refContent.current.classList.contains("deleting")) {
              if (refBlock && refBlock.current) {
                refBlock.current.classList.add("scale-down");
              }
            }
          }
          e.stopPropagation();
        },
        false
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (refBlock && refBlock.current) {
      refBlock.current.addEventListener("animationend", (e) => {
        if (refBlock && refBlock.current) {
          if (refBlock.current.classList.contains("scale-down"))
            dongbaekStore?.delete(dongbaek._id);
        }
      });
    }
  });

  const onDelete = React.useCallback(() => {
    dongbaekStore?.deleteRequest(dongbaek._id);
  }, [dongbaekStore, dongbaek]);

  return (
    <PaperBlock key={dongbaek._id} ref={refBlock}>
      <div
        className={`tong stick back ${dongbaek.deleteStatus ? "deleting" : ""}`}
      />
      <div
        className={`tong stick front ${
          dongbaek.deleteStatus ? "deleting" : ""
        }`}
        onMouseEnter={() => noticeDelete(true)}
        onMouseLeave={() => noticeDelete(false)}
        onClick={onDelete}
      />
      <div
        className={`tong delete notice ${
          dongbaek.deleteStatus ? "deleting" : ""
        }`}
        ref={refErase}
      >
        <BsEraser color="#fff" size={32} />
      </div>
      <PaperContent
        ref={refContent}
        className={`${dongbaek.deleteStatus ? "deleting" : ""}`}
      >
        <div className="dongbaek">
          <figure
            className={dongbaek.filter ? `${dongbaek.filter.className}` : ""}
          >
            <img
              src={`${process.env.REACT_APP_API_URL}/${dongbaek.image}`}
              alt={dongbaek.title}
            />
          </figure>
          <div className="shadow" ref={refShadow} />
        </div>
        <input type="text" value={title} onChange={onChangeTitle} />
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

const AniDelete = keyframes`
  0% {
    transform: translateY(0px);
  } 100% {
    transform: translateY(250px);
    opacity: 0;
  }
`;

const AniDeleteItem = keyframes`
  0%{
      opacity: 1;
  }100% {
      opacity: 0;
  }
`;

const AniScaleDown = keyframes`
  from {
    transform: translateY(250px);
    opacity: 0;
  }
  to {
    transform: translateY(250px);
    opacity: 0;
    width: 0;
  }
`;
const PaperContent = styled.div`
  width: 378px;
  box-sizing: border-box;
  position: relative;

  display: flex;
  flex-direction: column;

  z-index: 2;

  background-color: #fff;
  padding: 24px 24px 12px;
  border-radius: 8px;

  margin: 64px 0 0;

  &.deleting {
    animation: ${AniDelete} 0.25s ease-in forwards;
  }

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

    font-size: 20px;

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

  width: 378px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;

  &.scale-down {
    animation: ${AniScaleDown} 0.35s ease-in forwards;
  }

  & > .tong {
    position: absolute;
    top: 0;
    cursor: pointer;

    &.deleting {
      animation: ${AniDeleteItem} 0.25s ease-in forwards;
    }

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

export default inject((store: RootStore) => ({
  dongbaekStore: store.dongbaek,
}))(observer(Paper));

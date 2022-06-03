import { inject, observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import RootStore from "../../store";
import UIStore from "../../store/ui";

type Props = {
  uiStore?: UIStore;
};

const TIMER_OPTINS = [0, 5, 10];

function TimerSetting({ uiStore }: Props) {
  const updateTimer = React.useCallback(
    (option: number) => {
      if (uiStore?.patchConfig)
        uiStore?.patchConfig({
          timer: option,
        });
    },
    [uiStore]
  );
  return (
    <Block>
      {TIMER_OPTINS.map((option) => (
        <button
          className={`timer-option-${option} ${
            uiStore?.timer === option ? "select" : ""
          }`}
          key={`timer-option-${option}`}
          onClick={() => updateTimer(option)}
        >
          {option}
        </button>
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex: 1;
  width: 36px;

  padding: 8px 0;

  box-sizing: border-box;

  & > button {
    background: transparent;
    border: none;
    padding: 0;
    font-size: 14px;
    font-weight: 100;
    color: #999;
    line-height: 150%;
    cursor: pointer;

    &.timer-option-0 {
      font-size: 12px;
      transform: translate(4px);
    }
    &.timer-option-5 {
      transform: translate(8px);
    }
    &.timer-option-10 {
      transform: translate(-2px);
    }

    &.select {
      font-weight: 900;
      color: rgba(51, 51, 51);
      cursor: default;
    }

    &:not(.select) {
      transition: 0.2s;
      cursor: pointer;

      &:hover {
        font-weight: 500;
        color: rgba(51, 51, 51);
        font-size: 16px;
      }
    }
  }
`;

export default inject((store: RootStore) => ({
  uiStore: store.ui,
}))(observer(TimerSetting));

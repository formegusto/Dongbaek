import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import RootStore from "../../store";

type Props = {
  username?: string;
};

function Lens({ username }: Props) {
  return (
    <Block>
      <svg width="196" height="196" overflow="visible">
        <path
          id="lens-circle"
          fill="transparent"
          d=" M  1.4888402048036085   80.98247858864082  A  98 98 0 1 1 1.4888105037727115 80.98264703241693"
        ></path>
        <text width="500" fontWeight={100} fontSize={14}>
          <textPath xlinkHref="#lens-circle">@ {username}</textPath>
        </text>
      </svg>
      <LensShape />
    </Block>
  );
}

const LensShape = styled.div`
  position: absolute;

  width: 180px;
  height: 180px;

  border-radius: 100%;
  border: 2px solid #333;

  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    top: calc(50% - 65px);
    left: calc(50% - 65px);
    width: 130px;
    height: 130px;

    border-radius: 100%;
    border: 2px solid #333;
    box-sizing: border-box;
  }
`;

const Block = styled.div`
  position: relative;
  overflow: visible;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 214px;
  height: 214px;
`;

export default inject((store: RootStore) => ({
  username: store.auth.auth?.username,
}))(observer(Lens));

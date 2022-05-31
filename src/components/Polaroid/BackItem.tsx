import styled from "styled-components";
import { BsFilm } from "react-icons/bs";
import FilterObserver from "./FilterObserver";
import { Link } from "react-router-dom";
// import FilterModal from "./FilterModal";

function BackItem() {
  return (
    <Block>
      <ButtonBlock>
        <ButtonGroup>
          <Shutter />
          <Filter to="/filter">
            <FilterObserver />
            <span>FILTER</span>
          </Filter>
        </ButtonGroup>
        <Memory to="/memory">
          <BsFilm size={24} />
          <span>MEMORY</span>
        </Memory>
      </ButtonBlock>
      <Monitor>
        <video autoPlay id="dongbaek-stream" />
        {/* <FilterModal /> */}
      </Monitor>
    </Block>
  );
}

const Block = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  font-size: 8px;
`;

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  flex: 1;

  margin: 0 24px 0 0;
  transform: rotateY(180deg);
  padding: 12px 0 0;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  align-items: center;
  width: 48px;
`;

const Shutter = styled.button`
  position: relative;
  width: 48px;
  background: transparent;
  height: 48px;

  border: 1px solid #333;
  border-radius: 100%;

  cursor: pointer;

  &::after {
    content: "";
    transition: 0.3s;
    position: absolute;
    top: calc(50% - 21px);
    left: calc(50% - 21px);
    width: 42px;
    height: 42px;
    border-radius: 100%;
    background-color: #333;
  }

  &:hover {
    &::after {
      opacity: 0.7;
    }
  }
`;

const Filter = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 4px;

  color: #333;
  cursor: pointer;
`;

const Memory = styled(Link)`
  color: #333;

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 4px;

  opacity: 0.5;
  transition: 0.3s;
  &:hover {
    opacity: 1;
  }
`;

const Monitor = styled.div`
  position: relative;

  width: 340px;
  height: 100%;

  background-color: #333;
  border-radius: 16px;

  box-sizing: border-box;
  padding: 24px 0 0;

  display: flex;
  justify-content: center;

  & > video {
    position: relative;
    width: 340px;
    height: 220px;
  }
`;

export default BackItem;

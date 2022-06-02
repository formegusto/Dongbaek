import styled, { keyframes } from "styled-components";
import filters, { Filter } from "../../store/ui/filters";
import { BsX } from "react-icons/bs";

type Props = {
  setFilter: (status: boolean, filter?: Filter) => void;
};

function FilterModal({ setFilter }: Props) {
  return (
    <Block>
      <TitleBlock>
        <h1>Filter</h1>
        <div onClick={() => setFilter(false)}>
          <BsX size={32} />
        </div>
      </TitleBlock>
      <FilterList>
        {filters.map((filter) => (
          <FilterSelector onClick={() => setFilter(false, filter)}>
            <figure className={filter.className}>{filter.name}</figure>
          </FilterSelector>
        ))}
      </FilterList>
    </Block>
  );
}

const AniBlock = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

const Block = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  top: 24px;
  right: 24px;

  width: calc(340px - 48px);
  height: calc(220px);

  padding: 12px 0;
  box-sizing: border-box;

  background: rgba(51, 51, 51, 0.5);

  transform: rotateY(180deg);
  animation: ${AniBlock} 0.5s linear forwards;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: row;

  margin: 0 8px 10px;
  border-bottom: 1px solid #fff;

  color: #fff;
  & > h1 {
    flex: 1;
    display: flex;

    /* align-items: flex-end; */

    font-size: 24px;
    font-weight: 100;

    padding: 0 4px 12px;
  }
`;

const FilterList = styled.div`
  padding: 0 8px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  align-items: center;
  row-gap: 4px;
  column-gap: 6px;

  & > figure {
    border-radius: 16px;
  }
`;

const FilterSelector = styled.div`
  display: inline-block;

  white-space: nowrap;
  cursor: pointer;

  color: #fff;
  border: 1px solid #fff;

  box-sizing: border-box;

  border-radius: 16px;
  overflow: hidden;

  & > figure {
    padding: 4px 8px;
    font-size: 10px;
    font-weight: 100;
  }
`;

export default FilterModal;

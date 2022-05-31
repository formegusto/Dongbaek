import styled from "styled-components";
import filters from "../../store/ui/filters";

function FilterModal() {
  return (
    <Block>
      <FilterList>
        {filters.map((filter) => (
          <FilterSelector>
            <figure className={filter.className}>{filter.name}</figure>
          </FilterSelector>
        ))}
      </FilterList>
    </Block>
  );
}

const Block = styled.div`
  position: absolute;

  bottom: 48px;
  right: 24px;

  width: calc(340px - 48px);
`;

const FilterList = styled.div`
  padding: 0 8px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  align-items: center;
  row-gap: 4px;
  column-gap: 6px;

  transform: rotateY(180deg);

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

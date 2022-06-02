import styled from "styled-components";
import { Filter } from "../../store/ui/filters";

type Props = {
  filter?: Filter;
};

function FilterObserver({ filter }: Props) {
  return (
    <FilterObserverShape>
      <figure className={filter ? filter.className : ""} />
    </FilterObserverShape>
  );
}

const FilterObserverShape = styled.div`
  width: 36px;
  height: 36px;

  box-sizing: border-box;
  border-radius: 100%;
  border: 1px solid #333;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  & > figure {
    width: 64px;
    height: 64px;
  }
`;

export default FilterObserver;

import styled from "styled-components";
import { Filter } from "../../store/ui/filters";

type Props = {
  filter?: Filter;
};

// 사용자의 필터 설정이 변화하면 현재 사용자의 필터가 어떤 필터인지 띄운다.
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

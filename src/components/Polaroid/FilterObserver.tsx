import styled from "styled-components";

function FilterObserver() {
  return <FilterObserverShape />;
}

const FilterObserverShape = styled.div`
  width: 36px;
  height: 36px;

  box-sizing: border-box;
  border-radius: 100%;
  border: 1px solid #333;
`;

export default FilterObserver;

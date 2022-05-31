import styled from "styled-components";

function Printing() {
  return (
    <Block className="printing">
      <Paper />
      <PrintingShape />
    </Block>
  );
}

const Block = styled.div`
  position: absolute;
  bottom: 0;
  right: 24px;

  width: 340px;
  height: 272px;

  transform-style: preserve-3d;
`;

const Paper = styled.div`
  width: 340px;
  height: 272px;

  background-color: #fff;

  /* transform: translateY(269px); */
  border-radius: 16px;
`;

const PrintingShape = styled.div`
  width: 340px;
  height: 6px;

  border-radius: 3px;

  position: absolute;
  bottom: 0;
  right: 0;

  transform: rotateX(90deg) translateY(3px);
  transform-origin: 50% 100%;

  background-color: #121212;
`;

export default Printing;

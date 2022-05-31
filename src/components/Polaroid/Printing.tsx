import styled from "styled-components";

function Printing() {
  return (
    <Block className="printing">
      <Paper>
        <CaptureCanvas id="capture-canvas" />
      </Paper>
      <PrintingShape />
    </Block>
  );
}

const CaptureCanvas = styled.canvas`
  width: 304px;
  height: 220px;
`;

const Block = styled.div`
  position: absolute;
  bottom: 0;
  right: 24px;

  width: 340px;
  height: 272px;

  transform-style: preserve-3d;
`;

const Paper = styled.div`
  display: flex;
  justify-content: center;

  width: 340px;
  height: 272px;

  box-sizing: border-box;
  background-color: #fff;

  padding: 24px 0 0;

  transform: translateY(269px);
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

import styled from "styled-components";
import { ScreenWrapper } from "../styles/Wrapper";

function AuthComponent() {
  return (
    <ScreenWrapper flex>
      <Logo>
        <div className="main">
          <span className="dong">동</span>
          <span className="baek">백</span>
        </div>
        <div className="sub">
          GustoRoom Web SymbolProject
          <br />
          pt.2 polaroid
        </div>
      </Logo>
    </ScreenWrapper>
  );
}

const Logo = styled.div`
  background-color: #121212;
  color: #fff;

  & > .main {
    font-weight: bold;

    & > * {
      display: inline-block;
    }

    & > .dong {
      font-size: 164px;
    }

    & > .baek {
      font-size: 64px;
      transform: translateY(8px);
    }
  }

  & > .sub {
    font-weight: 100;
    font-size: 12px;
    line-height: 150%;

    margin: 15px 0 0;
    text-align: right;
  }
`;

export default AuthComponent;

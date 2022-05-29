import React from "react";
import styled, { css } from "styled-components";
import { Mode } from "../containers/AuthContainer";
import { ScreenWrapper } from "../styles/Wrapper";

type Props = {
  mode: Mode;
  changeMode: (mode: Mode) => void;
};

function AuthComponent({ mode, changeMode }: Props) {
  return (
    <ScreenWrapper flex>
      <AuthWrapper>
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
        <AuthForm>
          <Input type="text" name="username" placeholder="아이디" />
          <Input type="password" name="password" placeholder="비밀번호" />
          <ButtonGroup>
            <ModeList>
              <ModeButton
                isActive={mode === "sign-in"}
                className="sign-in"
                onClick={() => changeMode("sign-in")}
              >
                로그인
              </ModeButton>
              <ModeButton
                isActive={mode === "sign-up"}
                className="sign-up"
                onClick={() => changeMode("sign-up")}
              >
                회원가입
              </ModeButton>
            </ModeList>
            <Shutter type="submit" />
          </ButtonGroup>
        </AuthForm>
      </AuthWrapper>
    </ScreenWrapper>
  );
}

const ModeButton = styled.li<{ isActive: boolean }>`
  position: absolute;

  top: calc(50% - 12px);
  right: calc(100% - 82px);

  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;

  width: 70px;
  height: 24px;

  ${(props) =>
    props.isActive
      ? css`
          width: auto;
          right: 0;
          border: none;
          border-radius: 20px;
        `
      : css`
          border: 1px solid #fff;
          border-radius: 20px;

          opacity: 0.4;
          cursor: pointer;
        `}

  &:hover {
    opacity: 1;
  }
`;

const ModeList = styled.ul`
  position: relative;
  width: 218px;

  display: flex;
  color: #fff;
  margin: 0 8px 0 0;

  font-size: 12px;
`;

const Shutter = styled.button`
  position: relative;

  width: 32px;
  height: 32px;

  border-radius: 16px;
  border: 1px solid #fff;

  background-color: transparent;
  cursor: pointer;

  &:hover {
    &::after {
      opacity: 0.5;
    }
  }

  &::after {
    content: "";
    position: absolute;

    width: 26px;
    height: 26px;
    transition: 0.3s;

    top: calc(50% - 13px);
    left: calc(50% - 13px);

    background-color: #fff;
    border-radius: 13px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 282px;
  height: 48px;
`;

const Input = styled.input`
  color: white;
  font-size: 14px;
  height: 48px;

  background-color: transparent;
  border: none;

  box-sizing: border-box;
  padding: 0 12px 0;

  text-align: right;

  outline: none;
  transition: 0.3s;

  &:focus {
    border-bottom: 2px solid rgba(255, 255, 255, 1);
  }
`;

const AuthForm = styled.form`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin: 48px 0 0 16px;
  width: 350px;
  overflow-x: visible;

  & > * {
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  }

  & > input[name="username"] {
    width: 418px;
  }
  & > input[type="password"] {
    width: 350px;
    margin: 32px 0 0;
  }
`;

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

    margin: 16px 0 0;
    text-align: right;
  }
`;

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default AuthComponent;

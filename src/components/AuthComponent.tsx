import React from "react";
import styled, { css, keyframes } from "styled-components";
import Assets from "../assets";
import { Mode } from "../containers/AuthContainer";
import { ScreenWrapper } from "../styles/Wrapper";

type Props = {
  mode: Mode;
  changeMode: (mode: Mode) => void;
  loading: boolean;
  changeLoading: (e: React.FormEvent, loading: boolean) => void;
  success: boolean;
};

function AuthComponent({
  mode,
  changeMode,
  loading,
  changeLoading,
  success,
}: Props) {
  const refDongbaek = React.useRef<HTMLImageElement>(null);
  const refAuthForm = React.useRef<HTMLFormElement>(null);
  const [viewAuth, setViewAuth] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (refDongbaek && refDongbaek.current) {
      refDongbaek.current.addEventListener("animationend", () => {
        if (refAuthForm && refAuthForm.current) {
          setTimeout(() => {
            refAuthForm.current!.style.width = "350px";
            refAuthForm.current!.style.overflowX = "visible";
          }, 300);
          setTimeout(() => {
            setViewAuth(true);
          }, 800);
        }
      });
    }
  }, []);

  return (
    <ScreenWrapper flex fixed>
      <AuthWrapper>
        <Logo>
          <div className="flash">
            {!viewAuth && (
              <img
                className="general-dongbaek"
                src={Assets["DongbaekMiniX3"]}
                alt="dongbaekmini"
                ref={refDongbaek}
              />
            )}
            {success && (
              <img
                className="success-dongbaek"
                src={Assets["DongbaekMiniX3"]}
                alt="dongbaekmini"
                ref={refDongbaek}
              />
            )}
          </div>
          <div className="main">
            <span className="dong">동</span>
            <span className="baek">백</span>
          </div>
          <div className="sub">
            GustoRoom Web Symbol Project
            <br />
            pt.2 polaroid
          </div>
        </Logo>
        <AuthForm
          ref={refAuthForm}
          isView={viewAuth}
          onSubmit={
            loading
              ? (e) => {
                  e.preventDefault();
                }
              : (e) => changeLoading(e, true)
          }
        >
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
            <Shutter type="submit" loading={loading} />
          </ButtonGroup>
        </AuthForm>
      </AuthWrapper>
    </ScreenWrapper>
  );
}

const AniFlash = keyframes`
  0% {
    transform: translateY(0);
  } 100% {
    transform: translateY(-40px);
  }
`;

const AniSuccessDongbaek = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  } 50% {
    transform: scale(1.15);
    opacity: 1;
  } 100% {
    transform: scale(1.25);
    opacity: 0;
  }
`;

const AniGeneralDongbaek = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  } 60% {
    transform: scale(0);
    opacity: 0;
  } 80% {
    transform: scale(1.15);
    opacity: 1;
  } 100% {
    transform: scale(1.25);
    opacity: 0;
  }
`;

const AniShutter = keyframes`
  0% {
    transform: rotateZ(0deg);
  } 100% {
    transform: rotateZ(360deg);
  }
`;

const ModeButton = styled.li<{ isActive: boolean }>`
  font-size: 12px;
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
`;

const Shutter = styled.button<{ loading: boolean }>`
  position: relative;

  width: 32px;
  height: 32px;

  border-radius: 16px;
  border: 1px solid #fff;

  background-color: transparent;

  &::after {
    content: "";
    position: absolute;

    width: 26px;
    height: 26px;

    top: calc(50% - 13px);
    left: calc(50% - 13px);

    background-color: #fff;
    border-radius: 13px;
    box-sizing: border-box;
  }

  ${(props) =>
    props.loading
      ? css`
          &::after {
            background-color: transparent;
            border: none;

            border-right: 2px solid rgba(255, 255, 255, 0.7);
            border-top: 2px solid rgba(255, 255, 255, 0.7);
            animation: ${AniShutter} 0.75s infinite linear;
          }
        `
      : css`
          cursor: pointer;

          &::after {
            transition: 0.3s;
          }

          &:hover {
            &::after {
              opacity: 0.5;
            }
          }
        `}
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

const AuthForm = styled.form<{ isView: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin: 48px 0 0 16px;
  /* width: 350px; */
  width: 0px;
  overflow-x: hidden;
  /* overflow-x: visible; */
  transition: 0.5s;
  transform-origin: 100% 100%;

  & > * {
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  }

  ${(props) =>
    props.isView
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}

  & > input[name="username"] {
    width: 418px;
  }
  & > input[type="password"] {
    width: 350px;
    margin: 32px 0 0;
  }
`;

const Logo = styled.div`
  position: relative;
  color: #fff;
  overflow-y: visible;

  & > .flash {
    position: absolute;

    top: 0;
    left: 15px;

    border-width: 2px 2px 0px 2px;
    border-style: solid;
    border-color: #ffffff;
    border-radius: 8px 8px 0px 0px;
    width: 120px;
    height: 40px;

    animation: ${AniFlash} 0.3s linear forwards;

    & > img {
      position: absolute;
      top: -36px;
      left: calc(50% - 43.44px);

      width: 86.88px;

      transform-origin: 50% 50%;
      animation: ${AniGeneralDongbaek} 1.5s linear forwards;
    }

    & > .general-dongbaek {
      animation: ${AniGeneralDongbaek} 1.5s linear forwards;
    }
    & > .success-dongbaek {
      animation: ${AniSuccessDongbaek} 1s linear forwards;
    }
  }

  & > .main {
    position: relative;
    background-color: #121212;
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

  overflow-y: visible;
`;

export default AuthComponent;

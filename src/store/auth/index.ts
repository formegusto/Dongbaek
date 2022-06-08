import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import RootStore from "..";
import API from "../../api";
import { ResSkeleton } from "../../api/types";
import filters from "../ui/filters";
import { Authentication, Authorization, AuthSuccess } from "./types";

class AuthStore {
  root: RootStore;
  token?: string;
  auth?: Authorization;
  status?: boolean;
  error: boolean;

  constructor(root: RootStore) {
    this.root = root;

    makeAutoObservable(this);
    this.error = false;
  }

  // Error Animation 종료용
  errorCheck = () => {
    this.error = false;
  };

  // 로그인
  *signIn(
    auth: Authentication
  ): Generator<Promise<AxiosResponse<ResSkeleton<AuthSuccess>>>, void, any> {
    try {
      const res = yield API["user"].signIn(auth);

      // 로그인 성공 시, 토큰 정보 스토어에 저장
      this.token = res.data.token;
      this.status = true;
      this.error = false;
    } catch (err) {
      console.error(err);
      this.status = false;
      this.error = true;
    }
  }

  // 회원가입
  *signUp(
    auth: Authentication
  ): Generator<Promise<AxiosResponse<ResSkeleton<AuthSuccess>>>, void, any> {
    try {
      const res = yield API["user"].signUp({
        ...auth,
        config: { filter: filters[0] },
      });

      // 회원가입 성공 시, 토큰 정보 스토어에 저장
      this.token = res.data.token;
      this.status = true;
      this.error = false;
    } catch (err) {
      console.error(err);
      this.status = false;
      this.error = true;
    }
  }

  // 사용자 인증 정보 요청
  *check(): Generator<Promise<ResSkeleton<Authorization>>, void, any> {
    try {
      if (this.token) {
        const res = yield API["user"].checkToken(this.token);

        this.auth = res.data.auth;
        // refresh token 일 경우, == 유효기간이 만료된 토큰이 localStorage에 있다는 것
        const newToken = res.data.token;

        if (newToken) {
          // refresh token으로 교체
          this.token = newToken;
          localStorage.setItem("token", newToken);
        } else {
          localStorage.setItem("token", this.token);
        }

        this.status = true;
        // 사용자 촬영 설정 정보를 불러온다.
        this.root.ui.getConfig();
      }
    } catch (err) {
      this.status = false;

      console.error(err);
    }
  }

  initCheck = (token: string) => {
    this.token = token;
    this.check();
  };
}

export default AuthStore;

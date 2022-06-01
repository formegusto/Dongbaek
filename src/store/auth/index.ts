import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import API from "../../api";
import { ResSkeleton } from "../../api/types";
import { Authentication, Authorization, AuthSuccess } from "./types";

class AuthStore {
  token?: string;
  auth?: Authorization;

  constructor() {
    makeAutoObservable(this);
  }

  *signIn(
    auth: Authentication
  ): Generator<Promise<AxiosResponse<ResSkeleton<AuthSuccess>>>, void, any> {
    try {
      const res = yield API["user"].signIn(auth);

      this.token = res.data.token;
    } catch (err) {
      console.error(err);
    }
  }

  *signUp(
    auth: Authentication
  ): Generator<Promise<AxiosResponse<ResSkeleton<AuthSuccess>>>, void, any> {
    try {
      const res = yield API["user"].signUp(auth);

      this.token = res.data.token;
    } catch (err) {
      console.error(err);
    }
  }

  *check(): Generator<Promise<ResSkeleton<Authorization>>, void, any> {
    try {
      if (this.token) {
        const res = yield API["user"].checkToken(this.token);

        this.auth = res.data.auth;
        localStorage.setItem("token", this.token);
      }
    } catch (err) {
      console.error(err);
    }
  }

  initCheck = (token: string) => {
    this.token = token;
    this.check();
  };
}

export default AuthStore;

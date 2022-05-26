import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import API from "../../api";
import { ResSkeleton } from "../../api/types";
import { Auth, AuthSuccess } from "./types";

class AuthStore {
  token?: string;
  auth?: Auth;

  constructor() {
    makeAutoObservable(this);
  }

  *signIn(): Generator<
    Promise<AxiosResponse<ResSkeleton<AuthSuccess>>>,
    void,
    any
  > {
    try {
      const res = yield API["user"].signIn({
        username: "Hello",
        password: "1234",
      });

      this.token = res.data.token;
    } catch (err) {
      console.error(err);
    }
  }

  *signUp(): Generator<
    Promise<AxiosResponse<ResSkeleton<AuthSuccess>>>,
    void,
    any
  > {
    try {
      const res = yield API["user"].signUp({
        username: "Hello",
        password: "1234",
      });

      this.token = res.data.token;
    } catch (err) {
      console.error(err);
    }
  }

  *check(): Generator<Promise<AxiosResponse<ResSkeleton<Auth>>>, void, any> {
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
}

export default AuthStore;

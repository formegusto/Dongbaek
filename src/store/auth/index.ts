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

  constructor(root: RootStore) {
    this.root = root;
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
      const res = yield API["user"].signUp({
        ...auth,
        config: { filter: filters[0] },
      });

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

        this.root.ui.getConfig();
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

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

  errorCheck = () => {
    this.error = false;
  };

  *signIn(
    auth: Authentication
  ): Generator<Promise<AxiosResponse<ResSkeleton<AuthSuccess>>>, void, any> {
    try {
      const res = yield API["user"].signIn(auth);

      this.token = res.data.token;
      this.status = true;
      this.error = false;
    } catch (err) {
      console.error(err);
      this.status = false;
      this.error = true;
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
      this.status = true;
      this.error = false;
    } catch (err) {
      console.error(err);
      this.status = false;
      this.error = true;
    }
  }

  *check(): Generator<Promise<ResSkeleton<Authorization>>, void, any> {
    try {
      if (this.token) {
        const res = yield API["user"].checkToken(this.token);

        this.auth = res.data.auth;
        const newToken = res.data.token;

        if (newToken) {
          this.token = newToken;
          localStorage.setItem("token", newToken);
        } else {
          localStorage.setItem("token", this.token);
        }

        this.status = true;
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

import { Authentication, Authorization } from "../../store/auth/types";
import client from "../client";
import { ResSkeleton } from "../types";

const basePATH = "/auth";

export const signIn = (auth: Authentication) =>
  client.post(`${basePATH}/sign-in`, auth);

export const signUp = (auth: Authentication) =>
  client.post(`${basePATH}/sign-up`, auth);

export const checkToken = (token: string) =>
  client.get<any, ResSkeleton<Authorization>>(`${basePATH}/check`, {
    headers: {
      Authorization: token,
    },
  });

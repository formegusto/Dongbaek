import { Authentication, Authorization } from "../../store/auth/types";
import client from "../client";
import { ResSkeleton } from "../types";

const basePATH = "/auth";

// 로그인 API
export const signIn = (auth: Authentication) =>
  client.post(`${basePATH}/sign-in`, auth);

// 회원가입 API
export const signUp = (auth: Authentication) =>
  client.post(`${basePATH}/sign-up`, auth);

// 토큰 체크 API
export const checkToken = (token: string) =>
  client.get<any, ResSkeleton<Authorization>>(`${basePATH}/check`, {
    headers: {
      Authorization: token,
    },
  });

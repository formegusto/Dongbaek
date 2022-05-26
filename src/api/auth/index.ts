import client from "../client";
import { Auth } from "./types";

const basePATH = "/auth";

export const signIn = (auth: Auth) => client.post(`${basePATH}/sign-in`, auth);

export const signUp = (auth: Auth) => client.post(`${basePATH}/sign-up`, auth);

export const checkToken = (token: string) =>
  client.get(`${basePATH}/check`, {
    headers: {
      Authorization: token,
    },
  });

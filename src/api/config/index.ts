import { Config } from "../../store/auth/types";
import client from "../client";
import { ResSkeleton } from "../types";
import { ResGetConfig } from "./types";

const basePATH = "/config";

export const getConfig = () =>
  client.get<any, ResSkeleton<ResGetConfig>>(`${basePATH}`, {
    headers: {
      Authorization: localStorage.getItem("token")!,
    },
  });

export const patchConfig = (config: Config) =>
  client.patch<any, ResSkeleton>(`${basePATH}`, config, {
    headers: {
      Authorization: localStorage.getItem("token")!,
    },
  });

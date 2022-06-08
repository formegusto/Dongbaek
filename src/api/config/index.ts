import { Config } from "../../store/auth/types";
import client from "../client";
import { ResSkeleton } from "../types";
import { ResGetConfig } from "./types";

const basePATH = "/config";

// 촬영 설정 정보 조회 API
export const getConfig = () =>
  client.get<any, ResSkeleton<ResGetConfig>>(`${basePATH}`, {
    headers: {
      Authorization: localStorage.getItem("token")!,
    },
  });

// 촬영 설정 정보 수정 API
export const patchConfig = (config: Config) =>
  client.patch<any, ResSkeleton>(`${basePATH}`, config, {
    headers: {
      Authorization: localStorage.getItem("token")!,
    },
  });

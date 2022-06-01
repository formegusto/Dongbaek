import client from "../client";
import { ResSkeleton } from "../types";
import { ResGetDongbaekList } from "./types";

const basePATH = "/dongbaek";

export const postDongbaek = (data: FormData) =>
  client.post(`${basePATH}`, data, {
    headers: {
      Authorization: localStorage.getItem("token")!,
      "Content-Type": "multipart/form-data",
    },
  });

export const getDongbaekList = () =>
  client.get<any, ResSkeleton<ResGetDongbaekList>>(`${basePATH}`, {
    headers: {
      Authorization: localStorage.getItem("token")!,
    },
  });

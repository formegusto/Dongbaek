import client from "../client";
import { ResSkeleton } from "../types";
import { ResGetDongbaekList, ResPatchDongbaek } from "./types";

const basePATH = "/dongbaek";

export const getDongbaekList = () =>
  client.get<any, ResSkeleton<ResGetDongbaekList>>(`${basePATH}`, {
    headers: {
      Authorization: localStorage.getItem("token")!,
    },
  });

export const postDongbaek = (data: FormData) =>
  client.post(`${basePATH}`, data, {
    headers: {
      Authorization: localStorage.getItem("token")!,
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteDongbaek = (_id: string) =>
  client.delete<any, ResSkeleton>(`${basePATH}/${_id}`, {
    headers: {
      Authorization: localStorage.getItem("token")!,
      "Content-Type": "multipart/form-data",
    },
  });

export const patchDongbaek = (_id: string, title: string) =>
  client.patch<any, ResSkeleton<ResPatchDongbaek>>(
    `${basePATH}/${_id}`,
    {
      title: title,
    },
    {
      headers: {
        Authorization: localStorage.getItem("token")!,
      },
    }
  );

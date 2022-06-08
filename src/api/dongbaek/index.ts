import client from "../client";
import { ResSkeleton } from "../types";
import { ResGetDongbaekList, ResPatchDongbaek } from "./types";

const basePATH = "/dongbaek";

// 사진 리스트 조회 API
export const getDongbaekList = () =>
  client.get<any, ResSkeleton<ResGetDongbaekList>>(`${basePATH}`, {
    headers: {
      Authorization: localStorage.getItem("token")!,
    },
  });

// 사진 업로드 API
export const postDongbaek = (data: FormData) =>
  client.post(`${basePATH}`, data, {
    headers: {
      Authorization: localStorage.getItem("token")!,
      "Content-Type": "multipart/form-data",
    },
  });

// 사진 삭제 API
export const deleteDongbaek = (_id: string) =>
  client.delete<any, ResSkeleton>(`${basePATH}/${_id}`, {
    headers: {
      Authorization: localStorage.getItem("token")!,
      "Content-Type": "multipart/form-data",
    },
  });

// 사진 수정 API
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

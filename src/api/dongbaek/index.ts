import client from "../client";

const basePATH = "/dongbaek";

export const postDongbaek = (data: FormData) =>
  client.post(`${basePATH}`, data, {
    headers: {
      Authorization: localStorage.getItem("token")!,
      "Content-Type": "multipart/form-data",
    },
  });

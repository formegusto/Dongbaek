import client from "../client";

const basePATH = "/dongbaek";

export const postDongbaek = (data: FormData) =>
  client.post(`${basePATH}`, data, {
    headers: {
      Authorization: localStorage.getItem("token")!,
      "Content-Type": "multipart/form-data",
    },
  });

export const getDongbaekList = () =>
  client.get(`${basePATH}`, {
    headers: {
      Authorization: localStorage.getItem("token")!,
    },
  });

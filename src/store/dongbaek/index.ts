import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import API from "../../api";
import { ResGetDongbaekList } from "../../api/dongbaek/types";
import { ResSkeleton } from "../../api/types";
import { Dongbaek } from "./types";

class DongbaekStore {
  userImage?: Blob | null;
  image?: string | null;
  dongbaekList: Dongbaek[];

  constructor() {
    makeAutoObservable(this);

    this.dongbaekList = [];
  }

  clearImage = () => {
    this.userImage = null;
    this.image = null;
  };

  capture = (imageBlob: Blob | null) => {
    this.userImage = imageBlob;

    if (imageBlob) this.image = URL.createObjectURL(imageBlob);
  };

  *getList(): Generator<Promise<ResSkeleton<ResGetDongbaekList>>, void, any> {
    try {
      const res = yield API["dongbaek"].getDongbaekList();

      this.dongbaekList = res.data.dongbaeks;
    } catch (err) {
      console.error(err);
    }
  }

  *post(title: string): Generator<Promise<AxiosResponse>, void, any> {
    try {
      const data = new FormData();
      if (this.userImage) {
        data.append("title", title);
        data.append("image", this.userImage);
        const res = yield API["dongbaek"].postDongbaek(data);

        console.log(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default DongbaekStore;

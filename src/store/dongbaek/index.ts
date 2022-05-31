import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import API from "../../api";

class DongbaekStore {
  userImage?: Blob | null;
  image?: string | null;

  constructor() {
    makeAutoObservable(this);
  }

  clearImage = () => {
    this.userImage = null;
    this.image = null;
  };

  capture = (imageBlob: Blob | null) => {
    this.userImage = imageBlob;

    if (imageBlob) this.image = URL.createObjectURL(imageBlob);
  };

  *post(data: FormData): Generator<Promise<AxiosResponse>, void, any> {
    try {
      const res = yield API["dongbaek"].postDongbaek(data);

      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }
}

export default DongbaekStore;

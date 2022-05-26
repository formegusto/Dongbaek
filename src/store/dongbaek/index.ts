import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import API from "../../api";

class DongbaekStore {
  constructor() {
    makeAutoObservable(this);
  }

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

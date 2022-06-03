import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import RootStore from "..";
import API from "../../api";
import { ResGetDongbaekList } from "../../api/dongbaek/types";
import { ResSkeleton } from "../../api/types";
import { Dongbaek } from "./types";

class DongbaekStore {
  root: RootStore;
  userImage?: Blob | null;
  image?: string | null;
  dongbaekList: Dongbaek[];

  constructor(root: RootStore) {
    makeAutoObservable(this);

    this.dongbaekList = [];
    this.root = root;
  }

  clearImage = () => {
    this.userImage = null;
    this.image = null;
  };

  capture = (imageBlob: Blob | null) => {
    this.userImage = imageBlob;

    if (imageBlob) this.image = URL.createObjectURL(imageBlob);
  };

  *deleteRequest(_id: string): Generator<Promise<ResSkeleton>, void, any> {
    try {
      yield API["dongbaek"].deleteDongbaek(_id);

      // 요청 success 뜬 후에 실행시키기
      const targetIdx = this.dongbaekList.findIndex(
        (dongbaek) => dongbaek._id === _id
      );
      if (targetIdx !== -1) {
        const copyList = [...this.dongbaekList];
        copyList[targetIdx] = { ...copyList[targetIdx], deleteStatus: true };

        this.dongbaekList = copyList;
      }
    } catch (err) {
      console.error(err);
    }
  }

  delete = (_id: string) => {
    this.dongbaekList = this.dongbaekList.filter(
      (dongbaek) => dongbaek._id !== _id
    );
  };

  *getList(): Generator<Promise<ResSkeleton<ResGetDongbaekList>>, void, any> {
    try {
      const res = yield API["dongbaek"].getDongbaekList();

      this.dongbaekList = (res.data.dongbaeks as Dongbaek[]).map(
        (dongbaek) => ({
          ...dongbaek,
          deleteStatus: false,
        })
      );
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
        const filter = this.root.ui.filter;

        data.append("filterName", filter.name);
        data.append("filterClass", filter.className);

        const res = yield API["dongbaek"].postDongbaek(data);

        console.log(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  *patch(
    _id: string,
    title: string
  ): Generator<Promise<AxiosResponse>, void, any> {
    try {
      yield API["dongbaek"].patchDongbaek(_id, title);
    } catch (err) {
      console.error(err);
    }
  }
}

export default DongbaekStore;

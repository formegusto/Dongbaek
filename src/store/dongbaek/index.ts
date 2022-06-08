import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import RootStore from "..";
import API from "../../api";
import { ResGetDongbaekList, ResPatchDongbaek } from "../../api/dongbaek/types";
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

  // 서버로 사진 삭제 요청
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

  // 삭제 애니메이션 확인용 함수
  delete = (_id: string) => {
    this.dongbaekList = this.dongbaekList.filter(
      (dongbaek) => dongbaek._id !== _id
    );
  };

  // 사진 리스트 조회
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

  // 사진 업로드
  *post(title: string): Generator<Promise<AxiosResponse>, void, any> {
    try {
      const data = new FormData();
      if (this.userImage) {
        // multipart/form-data 형식으로 보내야한다.
        data.append("title", title);
        data.append("image", this.userImage);
        const filter = this.root.ui.filter;

        data.append("filterName", filter.name);
        data.append("filterClass", filter.className);

        yield API["dongbaek"].postDongbaek(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // 사진 제목 수정
  *patch(
    _id: string,
    title: string
  ): Generator<Promise<ResSkeleton<ResPatchDongbaek>>, void, any> {
    try {
      const res = yield API["dongbaek"].patchDongbaek(_id, title);
      const dongbaek = res.data.dongbaek;

      // 요청 success 뜬 후에 실행시키기
      const targetIdx = this.dongbaekList.findIndex(
        (dongbaek) => dongbaek._id === _id
      );
      if (targetIdx !== -1) {
        const copyList = [...this.dongbaekList];
        copyList[targetIdx] = { ...dongbaek, deleteStatus: false };

        this.dongbaekList = copyList;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default DongbaekStore;

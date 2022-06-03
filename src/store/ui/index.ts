import { makeAutoObservable } from "mobx";
import API from "../../api";
import { ResGetConfig } from "../../api/config/types";
import { ResSkeleton } from "../../api/types";
import { Config } from "../auth/types";
import filters, { Filter } from "./filters";

class UIStore {
  stream?: MediaStream;
  filter: Filter;
  timer: number;
  viewPreview: boolean;

  constructor() {
    makeAutoObservable(this);

    this.timer = 0;
    this.filter = filters[0];
    this.viewPreview = false;
  }

  setStream = (stream: MediaStream) => {
    this.stream = stream;
  };

  setPreview = (status: boolean) => {
    this.viewPreview = status;
  };

  setFilter = (filter: Filter) => {
    this.filter = filter;
  };

  *getConfig(): Generator<Promise<ResSkeleton<ResGetConfig>>, void, any> {
    try {
      const res = yield API["config"].getConfig();

      if (res.data.config) {
        const { filter, timer } = res.data.config;
        if (filter) this.filter = filter;
        if (timer || timer === 0) this.timer = timer;
      }
    } catch (err) {
      console.error(err);
    }
  }

  *patchConfig(config: Config): Generator<Promise<ResSkeleton>, void, any> {
    try {
      yield API["config"].patchConfig(config);

      this.getConfig();
    } catch (err) {
      console.error(err);
    }
  }
}

export default UIStore;

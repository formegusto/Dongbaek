import { Filter } from "../ui/filters";

export type Dongbaek = {
  _id: string;
  title: string;
  image: string;
  createdAt: string;
  deleteStatus: boolean;
  filter?: Filter;
};

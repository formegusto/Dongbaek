import { Filter } from "../ui/filters";

export type AuthSuccess = {
  token: string;
};

export type Config = {
  filter?: Filter;
  timer?: number;
};

export type Authentication = {
  username: string;
  password: string;
  config?: Config;
};

export type Authorization = {
  id: string;
  username: string;
  config?: Config;
};

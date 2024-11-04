import { AxiosPromise } from "axios";

export interface ISync<P> {
  fetch(id: string): AxiosPromise;
  save(data: P): AxiosPromise;
}

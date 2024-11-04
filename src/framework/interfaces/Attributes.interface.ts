export interface IAttributes<P> {
  get<K extends keyof P>(key: K): P[K];
  set(update: P): void;
  getAllProps(): P;
}

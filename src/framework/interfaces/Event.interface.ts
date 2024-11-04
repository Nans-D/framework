export type Callback = () => void;

export interface IEvent {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

import { Callback } from "./interfaces/Event.interface";

export class Eventing {
  events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback) => {
    const listeners = this.events[eventName] || [];
    listeners.push(callback);
    this.events[eventName] = listeners;
  };

  trigger = (eventName: string) => {
    const listeners = this.events[eventName];

    if (!listeners || !listeners.length) return;

    listeners.forEach((callback) => {
      callback();
    });
  };
}

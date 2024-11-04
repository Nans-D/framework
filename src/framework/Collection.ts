import axios from "axios";
import { Eventing } from "./Eventings";

export class Collection<T, P> {
  models: T[] = [];
  event: Eventing = new Eventing();

  constructor(public url: string, public deserialization: (json: P) => T) {}

  get on() {
    return this.event.on;
  }
  get trigger() {
    return this.event.trigger;
  }

  fetch(): void {
    axios.get(this.url).then((response) => {
      response.data.forEach((json: P) => {
        const user = this.deserialization(json);
        this.models.push(user);
      });
      this.trigger("change");
    });
  }
}

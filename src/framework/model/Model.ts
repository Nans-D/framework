import { IAttributes } from "../interfaces/Attributes.interface";
import { IEvent } from "../interfaces/Event.interface";
import { HasId } from "../interfaces/HasId.interface";
import { ISync } from "../interfaces/Sync.interface";

export class Model<P extends HasId> {
  constructor(
    private attributes: IAttributes<P>,
    private event: IEvent,
    private sync: ISync<P>
  ) {}

  // on peut utiliser le sucre syntaxique uniquement avec un constructor

  get = this.attributes.get;
  //   get get() {
  //     return this.attributes.get;
  //   }

  on = this.event.on;
  // get on() {
  //     return this.event.on;
  // }

  trigger = this.event.trigger;
  //   get trigger() {
  //     return this.event.trigger;
  //   }

  set(update: P) {
    this.attributes.set(update);
    this.event.trigger("change");
  }

  fetch() {
    const id = this.get("id");
    if (!id) throw new Error("Cannot fetch without id");

    this.sync
      .fetch(id)
      .then((response) => {
        this.set(response.data);
      })
      .catch((error) => {
        this.trigger(error);
      });
  }

  save() {
    this.sync.save(this.attributes.getAllProps()).then((response) => {
      this.trigger("save");
    });
  }

  getAllProps(): P {
    return this.attributes.getAllProps();
  }
}

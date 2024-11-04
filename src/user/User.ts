import { ApiSync } from "../framework/ApiSync";
import { Attributes } from "../framework/Attributes";
import { Collection } from "../framework/Collection";
import { Eventing } from "../framework/Eventings";
import { Model } from "../framework/model/Model";

export interface UserProps {
  id?: string;
  name?: string;
  age?: number;
}

const url = "http://localhost:3001/users";
export class User extends Model<UserProps> {
  static build(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(url)
    );
  }

  static buildCollection() {
    return new Collection<User, UserProps>(url, (json: UserProps) =>
      User.build(json)
    );
  }

  setRandomAge() {
    this.set({ age: Math.floor(Math.random() * 99 + 1) });
  }

  // signature de méthod : portée, nom, argument, retour
}

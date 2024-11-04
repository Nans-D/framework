import { Collection } from "../framework/Collection";
import { View } from "../framework/views/View";
import { User, UserProps } from "./User";

export class UserList extends View<User, UserProps> {
  private collection: Collection<User, UserProps> = User.buildCollection();
  initialize(): void {
    this.collection.on("change", () => {
      this.renderUsers(this.collection.models);
    });

    this.collection.fetch();
  }

  renderUsers(users: User[]): void {
    users.forEach((user) => {
      this.addUserOption(user.getAllProps());
    });
  }

  addUserOption(user: UserProps): void {
    const option = document.createElement("option");
    option.value = user.id!;
    option.text = user.name!;
    const selectElement = document.getElementById(
      "userSelect"
    ) as HTMLSelectElement;
    selectElement.appendChild(option);
  }

  template(): string {
    return `
      <div>
      <h1>User List</h1>
        <select id="userSelect">
          <option value="">Select a user</option>
        </select>
      </div>
    `;
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      "change:#userSelect": this.changeUser,
    };
  }

  changeUser = (): void => {
    const selectElement = document.querySelector(
      "#userSelect"
    ) as HTMLSelectElement;
    const selectedUserId = selectElement.value;
    console.log(selectedUserId);

    if (selectedUserId) {
      const selectedUser = this.collection.models.find(
        (user) => user.get("id") === selectedUserId
      );
      if (selectedUser) {
        const userData = selectedUser.getAllProps();
        this.model.set(userData);

        document.querySelector(".user-show")!.innerHTML = `
        <div>
            <h1>User Show</h1>
            <div>User name : ${userData.name}</div>
            <div>User age : ${userData.age}</div>
        </div>
        `;
      }
    }
  };
}

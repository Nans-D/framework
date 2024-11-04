import { User } from "./user/User";
import { UserEdit } from "./user/UserEdit";

const rootElement = document.getElementById("root");
const john = User.build({ name: "JOHN", age: 20 });

if (rootElement) {
  const userEdit = new UserEdit(rootElement, john);
  userEdit.render();
}

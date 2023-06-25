import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
  searchAll() {
    const items = userRepository.getAll();
    if (items.length === 0) {
      throw Error("User not found");
    }
    return items;
  }
  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
  create(newUser) {
    const item = userRepository.create(newUser);
    if (!item) {
      throw Error("User not create");
    }
    return item;
  }
  put(id, data) {
    const item = userRepository.update(id, data);

    if (!item) {
      throw Error("User not update");
    }
    return item;
  }
  delete(id) {
    const item = userRepository.delete(id);
    if (item.length === 0) {
      throw Error("User not found");
    }
    return item;
  }
}
const userService = new UserService();

export { userService };

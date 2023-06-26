import { AlreadyExistError } from "../classes/errors/AlreadyExistError.js";
import { NotFoundError } from "../classes/errors/NotFoundError.js";
import { userRepository } from "../repositories/userRepository.js";

const model = "User";

class UserService {
  // TODO: Implement methods to work with user

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      throw new NotFoundError("", { model });
    }
    return item;
  }
  createNew(user) {
    if (userRepository.isExist([user.email, user.phoneNumber])) {
      throw new AlreadyExistError("", { model });
    }

    return userRepository.create(user);
  }
  getAll() {
    return userRepository.getAll();
  }
  update(id, user) {
    if (userRepository.isExist([user.email, user.phoneNumber], id)) {
      throw new AlreadyExistError("", { model });
    }
    const item = userRepository.update(id, user);
    if (!item.id) {
      throw new NotFoundError("", { model });
    }

    return item;
  }

  delete(id) {
    const item = userRepository.delete(id);
    if (!item.length) {
      throw new NotFoundError("", { model });
    }
    return item;
  }
}

const userService = new UserService();

export { userService };

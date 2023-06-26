import { AlreadyExistError } from "../classes/errors/AlreadyExistError.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

const model = "Fighter";

class FighterService {
  // TODO: Implement methods to work with fighters
  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      throw new NotFoundError("", { model });
    }
    return item;
  }
  createNew(fighter) {
    if (fighterRepository.isExist([fighter.name])) {
      throw new AlreadyExistError("", { model });
    }

    return fighterRepository.create(fighter);
  }
  getAll() {
    return fighterRepository.getAll();
  }
  update(id, fighter) {
    if (fighterRepository.isExist([fighter.name], id)) {
      throw new AlreadyExistError("", { model });
    }
    const item = fighterRepository.update(id, fighter);
    if (!item.id) {
      throw new NotFoundError("", { model });
    }

    return item;
  }

  delete(id) {
    const item = fighterRepository.delete(id);
    if (!item.length) {
      throw new NotFoundError("", { model });
    }
    return item;
  }
}

const fighterService = new FighterService();

export { fighterService };

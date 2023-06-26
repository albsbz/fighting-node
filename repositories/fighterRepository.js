import { BaseRepository } from "./baseRepository.js";

class FighterRepository extends BaseRepository {
  constructor() {
    super("fighters");
  }

  isExist([name], id) {
    const existWithName = name && super.getOne({ name });
    if (!id) {
      return existWithName;
    }
    return existWithName && id !== existWithName.id;
  }
}

const fighterRepository = new FighterRepository();

export { fighterRepository };

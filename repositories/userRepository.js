import { BaseRepository } from "./baseRepository.js";

class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  isExist([email, phoneNumber], id) {
    const existWithEmail = email && super.getOne({ email });
    const existWithPhoneNumber = phoneNumber && super.getOne({ phoneNumber });
    if (!id) {
      return existWithEmail || existWithPhoneNumber;
    }
    return (
      (existWithEmail && id !== existWithEmail.id) ||
      (existWithPhoneNumber && id !== existWithPhoneNumber.id)
    );
  }
}

const userRepository = new UserRepository();

export { userRepository };

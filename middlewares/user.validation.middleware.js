import { ValidationError } from "../classes/errors/ValidationError.js";
import {
  idFieldPresent,
  allFieldsPresent,
  extraFieldsPresent,
  oneFieldIsPresent,
} from "../helpers/validators.js";
import { USER } from "../models/user.js";

const model = USER;

const validEmail = (s) => {
  return String(s)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@gmail.com$/
    );
};

const validPhone = (s) => {
  return String(s).match(/^\+380[0-9]{9}$/);
};

const validPassword = (s) => {
  if (typeof s !== "string") return false;
  if (s.length < 3) return false;
  return true;
};

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const error = new ValidationError("validation", {
    model: "User",
    action: "create",
  });
  const user = req.body;
  if (
    idFieldPresent(user) ||
    !allFieldsPresent(user, ["id"], model) ||
    extraFieldsPresent(user, model) ||
    !validEmail(user.email) ||
    !validPhone(user.phoneNumber) ||
    !validPassword(user.password)
  ) {
    res.err = error;
    next();
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const error = new ValidationError("validation", {
    model: "User",
    action: "update",
  });
  const user = req.body;

  if (
    idFieldPresent(user) ||
    extraFieldsPresent(user, model) ||
    !oneFieldIsPresent(user) ||
    (user.email && !validEmail(user.email)) ||
    (user.phoneNumber && !validPhone(user.phoneNumber)) ||
    (user.password && !validPassword(user.password))
  ) {
    res.err = error;
    next();
  }
  next();
};

export { createUserValid, updateUserValid };

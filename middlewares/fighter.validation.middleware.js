import { FIGHTER } from "../models/fighter.js";
import {
  idFieldPresent,
  allFieldsPresent,
  extraFieldsPresent,
  oneFieldIsPresent,
} from "../helpers/validators.js";
import { ValidationError } from "../classes/errors/ValidationError.js";

const model = FIGHTER;

const HEALTH_BY_DEFAULT = 100;

const validPower = (s) => {
  if (typeof s !== "number") return false;
  return s >= 1 && s <= 100;
};

const validDefense = (s) => {
  if (typeof s !== "number") return false;
  return s >= 1 && s <= 10;
};

const validHealth = (s) => {
  if (!s) return true;
  if (typeof s !== "number") return false;
  return s >= 80 && s <= 120;
};

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const error = new ValidationError("validation", {
    model: "Fighter",
    action: "create",
  });
  const fighter = req.body;
  if (
    idFieldPresent(fighter) ||
    !allFieldsPresent(fighter, ["id", "health"], model) ||
    extraFieldsPresent(fighter, model) ||
    !validPower(fighter.power) ||
    !validDefense(fighter.defense) ||
    !validHealth(fighter.health)
  ) {
    res.err = error;
    next();
  }
  if (!fighter.health) fighter.health = HEALTH_BY_DEFAULT;
  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const error = new ValidationError("validation", {
    model: "Fighter",
    action: "update",
  });
  const fighter = req.body;

  if (
    idFieldPresent(fighter) ||
    extraFieldsPresent(fighter, model) ||
    !oneFieldIsPresent(fighter) ||
    (fighter.power && !validPower(fighter.power)) ||
    (fighter.defence && !validDefense(fighter.defence)) ||
    (fighter.health && !validHealth(fighter.health))
  ) {
    res.err = error;
    next();
  }
  next();
};

export { createFighterValid, updateFighterValid };

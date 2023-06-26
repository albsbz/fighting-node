import { AlreadyExistError } from "../classes/errors/AlreadyExistError.js";
import { NotFoundError } from "../classes/errors/NotFoundError.js";
import { ValidationError } from "../classes/errors/ValidationError.js";

const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  const err = res.err;
  let code;
  let response;
  if (err) {
    code = 400;
    response = {
      error: true,
      message: `${err.message}`,
    };
    if (err instanceof ValidationError) {
      code = 400;
      response = {
        error: true,
        message: `${err.data.model} entity to ${err.data.action} isn't valid`,
      };
    }
    if (err instanceof AlreadyExistError) {
      code = 400;
      response = {
        error: true,
        message: `${err.data.model} already exist`,
      };
    }
    if (err instanceof NotFoundError) {
      code = 404;
      response = {
        error: true,
        message: `${err.data.model} not found`,
      };
    }
  } else {
    code = 200;
    response = {
      data: res.data,
    };
  }
  res.status(code).send(JSON.stringify(response));
  next();
};

export { responseMiddleware };

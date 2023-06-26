class AlreadyExistError extends Error {
  constructor(message, data) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.data = data;
  }
}

export { AlreadyExistError };

const idFieldPresent = (user) => user["id"] !== undefined;

const allFieldsPresent = (user, except, model) =>
  !Object.keys(model).some((key) => {
    if (except.includes(key)) return false;
    if (!user[key]) {
      return true;
    }
  });

const extraFieldsPresent = (user, model) =>
  Object.keys(user).some((key) => {
    if (model[key] === undefined || !user[key]) return true;
  });

const oneFieldIsPresent = (user) => Object.keys(user).length;

export {
  idFieldPresent,
  allFieldsPresent,
  extraFieldsPresent,
  oneFieldIsPresent,
};

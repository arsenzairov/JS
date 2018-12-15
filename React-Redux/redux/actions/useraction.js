export const ADD_USER = "[USER] ADD";
export const GET_USER = "[GET] USER";
export const SET_ACTIVE_USER = "[SET] ACTIVE USER";

const modify = obj => {
  return { ...obj, portfolio: [] };
};

export const addUser = (hash, user) => ({
  type: ADD_USER,
  key: hash,
  payload: modify(user)
});

export const setActiveUser = hash => ({
  type: SET_ACTIVE_USER,
  key: hash
});

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const updateLocalStorage = (key, update) => {
  return localStorage.setItem(key, JSON.stringify(update));
};

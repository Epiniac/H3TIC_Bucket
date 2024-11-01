export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => !!localStorage.getItem("authToken");

export const setToken = (token) => {
    localStorage.setItem("authToken", token);
};

export const removeToken = () => {
    localStorage.removeItem("authToken");
};

export const Auth = {
  login(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem("user");
  },

  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem("user");
  },
};

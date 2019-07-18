export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("token")) || false
};

export const resolvers = {
  Mutation: {
    logIn: (_, { token }, { cache }): null => {
      localStorage.setItem("token", token);
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    logOut: (_, __, { cache }): null => {
      localStorage.removeItem("token");
      window.location.href = "/";
      return null;
    }
  }
};

import React, { PropsWithChildren, useState } from "react";

type AuthContextState = {
  token: string | null | undefined;
  isLoggedIn: boolean;
  email: string | null | undefined;
  login: (token: string, email: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextState>({
  token: null,
  isLoggedIn: false,
  email: null,
  login: () => {},
  logout: () => {},
});
export default AuthContext;

export const AuthContextProvider = (props: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>();
  const [email, setEmail] = useState<string | null>();
  const userIsLoggedIn = !!token;

  const loginHandler = (token: string, email: string) => {
    setToken(token);
    setEmail(email);
  };

  const logoutHandler = () => {
    setToken(null);
    setEmail(null);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    email: email,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

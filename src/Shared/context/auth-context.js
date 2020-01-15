import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  username: null,
  userEmail: null,
  partnerId: null,
  partnerName: null,
  login: () => {},
  logout: () => {}
});

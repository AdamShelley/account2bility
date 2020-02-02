import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  username: null,
  userEmail: null,
  partnerId: null,
  userImage: null,
  partnerName: null,
  partnerRequest: null,
  login: () => {},
  logout: () => {}
});

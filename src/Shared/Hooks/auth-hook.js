import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [userId, setUserId] = useState();
  const [partnerId, setPartnerId] = useState();
  const [username, setUsername] = useState();
  const [partnerName, setPartnerName] = useState();
  const [userEmail, setuserEmail] = useState();
  const [token, setToken] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userImage, setUserImage] = useState();
  const [partnerRequest, setPartnerRequest] = useState();
  const [partnerRequested, setPartnerRequested] = useState();
  const [partnerEmail, setPartnerEmail] = useState();

  const login = useCallback((data, expirationDate) => {
    // console.log(data);
    setToken(data.token);
    setUserImage(data.image);
    setUserId(data.userId);
    setUsername(data.name);
    setuserEmail(data.email);

    if (data.partner) {
      setPartnerName(data.partner.name);
      setPartnerId(data.partner._id);
    }

    if (data.partner === null && data.partnerRequest) {
      // console.log("adding partner request");
      setPartnerRequest(data.partnerRequest);
    }

    if (data.partnerRequested) {
      setPartnerRequested(data.partnerRequested);
      setPartnerEmail(data.partnerEmail);
    }

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        data: data,
        token: data.token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const updatePartner = useCallback(data => {
    setPartnerId(data);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    setPartnerName(null);
    setPartnerId(null);
    setuserEmail(null);
    setUserImage(null);
    setTokenExpirationDate(null);
    setPartnerRequest(null);
    setPartnerRequested(null);
    setPartnerEmail(null);
    localStorage.removeItem("userData");
  }, []);

  // Auto logout if token has expired
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, token, tokenExpirationDate]);

  // Auto login if token is still valid
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.data, new Date(storedData.expiration));
    }
  }, [login]);

  return {
    token,
    login,
    logout,
    updatePartner,
    userId,
    username,
    userEmail,
    partnerId,
    partnerName,
    partnerRequest,
    partnerRequested,
    partnerEmail,
    userImage
  };
};

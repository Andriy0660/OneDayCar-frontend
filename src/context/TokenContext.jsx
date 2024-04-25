import { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export const useTokenContext = () => {
  return useContext(TokenContext);
};

export const TokenProvider = ({ children }) => {
  const [token, setTokenState] = useState(localStorage.getItem("token"));
  const [id, setIdState] = useState(localStorage.getItem("id"));

  const setToken = (newToken) => {
    setTokenState(newToken);
    localStorage.setItem("token", newToken || "");
  };

  const setId = (newId) => {
    setIdState(newId);
    localStorage.setItem("id", newId || "");
  };

  return (
    <TokenContext.Provider value={{ token, setToken, id, setId }}>
      {children}
    </TokenContext.Provider>
  );
};

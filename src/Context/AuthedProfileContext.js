import React, { useState, useContext, createContext } from "react";

const UserContext = createContext(null);

const AuthedProfileContext = createContext(null);

export const AuthedProfileProvider = ({ children }) => {
  const [authedProfile, setAuthedProfile] = useState(null);
  const value = {
    authedProfile,
    setAuthedProfile,
  };
  return (
    <AuthedProfileContext.Provider value={value}>
      {children}
    </AuthedProfileContext.Provider>
  );
};

export const useAuthedProfile = () => useContext(AuthedProfileContext);
export default UserContext;

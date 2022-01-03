import React, { useState, useContext, createContext } from "react";

const FoodCountContext = createContext({});

const AuthedProfileContext = createContext({});

export const AuthedProfileProvider = ({ children }) => {
  const [authedProfile, setAuthedProfile] = useState(null);
  const [foodCount, setFoodCount] = useState(null);
  const value = {
    authedProfile,
    setAuthedProfile,
  };
  const countValue = {
    foodCount,
    setFoodCount,
  };
  return (
    <AuthedProfileContext.Provider value={value}>
      <FoodCountContext.Provider value={countValue}>
        {children}
      </FoodCountContext.Provider>
    </AuthedProfileContext.Provider>
  );
};

export const useAuthedProfile = () => useContext(AuthedProfileContext);
export const useFoodCount = () => useContext(FoodCountContext);
export default useAuthedProfile;

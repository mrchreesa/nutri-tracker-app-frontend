import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const FoodCountContext = createContext({});
const AuthedProfileContext = createContext({});

export const AuthedProfileProvider = ({ children }) => {
	const [authedProfile, setAuthedProfile] = useState(null);
	const [foodCount, setFoodCount] = useState(null);
	const [isLoading, setIsLoading] = useState(true); // Add loading state

	useEffect(() => {
		const fetchSession = async () => {
			try {
				console.log("Fetching session...");
				const response = await axios.get("https://nutri-tracker-app-backend.vercel.app/users/session", { withCredentials: true });
				console.log("Session response:", response.data);
				// Store the entire user object instead of just the username
				setAuthedProfile(response.data);
			} catch (error) {
				console.error("Session fetch failed:", error.response?.status, error.response?.data);
				setAuthedProfile(null);
			} finally {
				setIsLoading(false);
			}
		};
		fetchSession();
	}, []);

	const value = { authedProfile, setAuthedProfile, isLoading };
	const countValue = { foodCount, setFoodCount };

	return (
		<AuthedProfileContext.Provider value={value}>
			<FoodCountContext.Provider value={countValue}>{children}</FoodCountContext.Provider>
		</AuthedProfileContext.Provider>
	);
};

export const useAuthedProfile = () => useContext(AuthedProfileContext);
export const useFoodCount = () => useContext(FoodCountContext);
export default useAuthedProfile;

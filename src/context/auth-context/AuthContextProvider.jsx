import { createContext, useContext, useEffect, useState } from "react";
import { $Services } from "../../services/services-repository";
import { Navigate, useLocation, useNavigate } from "react-router";
import { $Utilities } from "../../utilities/utilities-repository";
import { fa } from "zod/v4/locales";

const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [socialAppToken, setSocialAppToken] = useState(
    () => localStorage.getItem("social-app-token") || null,
  );
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!socialAppToken;

  function logout() {
    setSocialAppToken(null);
    setProfileData(null);
    localStorage.removeItem("social-app-token");
  }

  useEffect(() => {
    async function fetchProfile() {
      if (!socialAppToken) {
        setProfileData(null);
        setIsLoading(false);
        return;
      }
      if (!profileData) {
        try {
          const { data } = await $Services.USER_REPOSITORY.getMyProfile();
          setProfileData(data || null);
        } catch (err) {
          logout();
          $Utilities.Alerts.displayError(
            new Error("Session expired. Please log in again.", { cause: err }),
          );
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchProfile();
  }, [socialAppToken, profileData]);

  useEffect(() => {
    if (socialAppToken)
      localStorage.setItem("social-app-token", socialAppToken);
    else localStorage.removeItem("social-app-token");
  }, [socialAppToken]);

  return (
    <AuthContext.Provider
      value={{
        socialAppToken,
        setSocialAppToken,
        profileData,
        setProfileData,
        isAuthenticated,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
// Custom hook to use the AuthContext
/**
 * @returns {{ socialAppToken: string | null, setSocialAppToken: () => void, profileData: any, setProfileData: () => void, isAuthenticated: boolean, logout: () => void }} An object containing the authentication token and a function to update it.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}

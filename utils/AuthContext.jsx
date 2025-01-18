import { createContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext();

// Provide context
export const AuthProvider = ({ children }) => {
  // Initialize userInfo state with a function that tries to parse localStorage safely
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const storedUserInfo = localStorage.getItem("user");
      if (storedUserInfo) {
        return JSON.parse(storedUserInfo);
      }
      return null;
    } catch (error) {
      console.error("Error parsing user info from localStorage", error);
      return null;
    }
  });

  // Update localStorage whenever userInfo changes
  useEffect(() => {
    if (userInfo) {
      try {
        localStorage.setItem("user", JSON.stringify(userInfo));
      } catch (error) {
        console.error("Error saving user info to localStorage", error);
      }
    } else {
      localStorage.removeItem("user");
    }
  }, [userInfo]);

  // Login function to update userInfo
  const login = (user) => {
    setUserInfo(user);
  };

  // Logout function to clear userInfo and make a logout request
  const logout = async () => {
    try {
      if (userInfo?.id) {
        await fetch("https://lifetrak.onrender.com/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userInfo.id }),
        });
      }
      setUserInfo(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

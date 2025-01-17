import { createContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext();

// Provide context
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  // Update localStorage whenever userInfo changes
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("user", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("user");
    }
  }, [userInfo]);

  const login = (user) => {
    setUserInfo(user);
  };

  const logout = async () => {
    try {
      await fetch("https://lifetrak.onrender.com/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userInfo?.id }),
      });
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

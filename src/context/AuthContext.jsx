import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ================= INIT =================
  useEffect(() => {

    try {

      const storedUser =
        localStorage.getItem("user");

      const token =
        localStorage.getItem("token");

      if (storedUser && token && storedUser !== "undefined") {

        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);

      } else {

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      }

    } catch (error) {

      console.log("Auth init error:", error);

      localStorage.clear();
    }

    setLoading(false);

  }, []);

  // ================= LOGIN =================
  const login = (userData, token) => {

    if (!userData || !token) return;

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem("token", token);

    localStorage.setItem(
      "role",
      userData?.role || ""
    );

    setUser(userData);
    setIsLoggedIn(true);
  };

  // ================= LOGOUT =================
  const logout = () => {

    localStorage.clear();

    setUser(null);
    setIsLoggedIn(false);
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ================= HOOK =================
export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
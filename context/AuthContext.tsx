import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

const AuthContext = createContext({
  auth: { isAuthenticated: false },
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/auth/check`,
          {
            method: "GET",
            credentials: "include", // Include the HTTP-only cookie
          }
        );

        if (response.ok) {
          setAuth({ isAuthenticated: true });
        } else {
          setAuth({ isAuthenticated: false });
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuth({ isAuthenticated: false });
      }
    };

    checkAuthStatus();
  }, []);

  const login = () => {
    setAuth({ isAuthenticated: true });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

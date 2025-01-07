import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  auth: { isAuthenticated: boolean };
  login: () => void;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  auth: { isAuthenticated: false },
  login: () => {},
  logout: () => {},
  checkAuthStatus: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
  });

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
        const data = await response.json();
        setAuth({ isAuthenticated: data.authenticated });
      } else {
        setAuth({ isAuthenticated: false });
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setAuth({ isAuthenticated: false });
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = () => {
    setAuth({ isAuthenticated: true });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

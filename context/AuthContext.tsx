import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";

interface AuthContextType {
  auth: { isAuthenticated: boolean };
  login: () => void;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  auth: { isAuthenticated: false },
  login: () => { },
  logout: () => { },
  checkAuthStatus: async () => { },
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
  });
  const backendServer = process.env.NEXT_PUBLIC_BACKEND_SERVER;

  const setAuthenticated = useCallback((isAuthenticated: boolean) => {
    setAuth((prev) =>
      prev.isAuthenticated === isAuthenticated ? prev : { isAuthenticated },
    );
  }, []);

  const checkAuthStatus = useCallback(async () => {
    if (!backendServer) {
      setAuthenticated(false);
      return;
    }

    try {
      const response = await fetch(`${backendServer}/auth/check`, {
        method: "GET",
        credentials: "include", // Include the HTTP-only cookie
      });

      if (response.ok) {
        const data = await response.json();
        setAuthenticated(Boolean(data.authenticated));
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setAuthenticated(false);
    }
  }, [backendServer, setAuthenticated]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = useCallback(() => {
    setAuthenticated(true);
  }, [setAuthenticated]);

  const logout = useCallback(() => {
    setAuthenticated(false);
  }, [setAuthenticated]);

  const value = useMemo(
    () => ({ auth, login, logout, checkAuthStatus }),
    [auth, login, logout, checkAuthStatus],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

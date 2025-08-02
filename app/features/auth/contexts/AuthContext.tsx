import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { fetchAuthSession, signOut } from 'aws-amplify/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: any | null;
  login: () => void;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  const checkAuthStatus = async () => {
    try {
      const session = await fetchAuthSession();
      const hasValidSession = session.tokens !== undefined;
      
      console.log("🔑 hasValidSession:", hasValidSession);
      
      setIsLoggedIn(hasValidSession);
      
      if (hasValidSession && session.tokens) {
        // Decode JWT token to get user info
        const idToken = session.tokens.idToken?.toString();
        if (idToken) {
          const payload = JSON.parse(atob(idToken.split('.')[1]));
          setUser(payload);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    // This will be called after successful login to update the state
    checkAuthStatus();
  };

  const logout = async () => {
    try {
      await signOut();
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("id_token");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    isLoggedIn,
    isLoading,
    user,
    login,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
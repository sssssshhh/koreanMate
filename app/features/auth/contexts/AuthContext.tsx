import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAuthSession, signOut } from "aws-amplify/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: any;
  login: () => void;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const session = await fetchAuthSession();
      
      if (session.tokens) {
        const idToken = session.tokens.idToken;
        const accessToken = session.tokens.accessToken;
        
        if (idToken && accessToken) {
          // JWT 토큰에서 사용자 정보 추출
          const payload = idToken.payload;
          const userData = {
            sub: payload.sub,
            email: payload.email,
            name: payload.name,
            ...payload
          };
          
          setUser(userData);
          setIsLoggedIn(true);
          
          // 로컬 스토리지에 토큰 저장
          localStorage.setItem('access_token', accessToken.toString());
          localStorage.setItem('id_token', idToken.toString());
        } else {
          setIsLoggedIn(false);
          setUser(null);
          localStorage.removeItem('access_token');
          localStorage.removeItem('id_token');
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
      }
    } catch (error) {
      console.error("Auth status check failed:", error);
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    // 로그인 상태를 true로 설정하고 사용자 정보 업데이트
    checkAuthStatus();
  };

  const logout = async () => {
    try {
      await signOut();
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // 주기적으로 인증 상태 확인 (토큰 만료 감지)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoggedIn) {
        checkAuthStatus();
      }
    }, 60000); // 1분마다 확인

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const value: AuthContextType = {
    isLoggedIn,
    isLoading,
    user,
    login,
    logout,
    checkAuthStatus
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 
"use client";
import { useState, useEffect, createContext, useContext } from 'react';
import { authAPI } from '../lib/api/auth';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone?: string;
  investmentType?: string;
  isSub?: boolean,
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (
    userData: LoginData
  ) => Promise<{ success: boolean; error?: string }>;

  signup: (
    userData: SignupData
  ) => Promise<{ success: boolean; error?: string }>;

  logout: () => void;
}



export interface SignupData {
  name: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  passwordCheck: string; // 비밀번호 확인
  termsService: boolean;
  termsPrivacy: boolean;
  termsMarketing?: boolean; // 선택
  investmentType?: string;
  uids: {
    exchangeName: string;
    uid: string;
  }[]; // 거래소 UID 리스트
}


interface LoginData {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkExistingAuth = () => {
      try {
        const storedUser = localStorage.getItem('auth_user');
        const storedToken = localStorage.getItem('auth_token');

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking existing auth:', error);
        // Clear corrupted data
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingAuth();
  }, []);

  const login = async (userData: LoginData) => {
    setIsLoading(true);
    try {
      const result = await authAPI.login(userData);
      if (result.success && (result as any).user) {
        setUser((result as any).user);
      }
      return result;
    } catch (error) {
      return { success: false, error: '로그인 중 오류가 발생했습니다.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    try {
      const result = await authAPI.signup(userData);
      return result;
    } catch (error) {
      return { success: false, error: '회원가입 중 오류가 발생했습니다.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout
  };
};
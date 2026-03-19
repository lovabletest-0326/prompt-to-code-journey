import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, User } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  showAuth: 'login' | 'signup' | null;
  setShowAuth: (v: 'login' | 'signup' | null) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [showAuth, setShowAuth] = useState<'login' | 'signup' | null>(null);

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const login = useCallback((email: string, password: string) => {
    const result = authService.login(email, password);
    if (result.success && result.user) setUser(result.user);
    return result;
  }, []);

  const signup = useCallback((name: string, email: string, password: string) => {
    const result = authService.signup(name, email, password);
    if (result.success && result.user) setUser(result.user);
    return result;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, showAuth, setShowAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, verifyAdminToken, AdminUser } from '../services/portfolioService';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  adminToken: string | null;
  isAdminLoggedIn: boolean;
  isAuthLoading: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const TOKEN_KEY = 'geekforge_admin_auth_token';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    const checkExistingToken = async () => {
      if (!adminToken) {
        setIsAuthLoading(false);
        return;
      }

      try {
        const verified = await verifyAdminToken(adminToken);
        if (mounted) {
          if (verified) {
            setAdminUser(verified);
          } else {
            // Invalid or expired
            setAdminUser(null);
            setAdminToken(null);
            try {
              localStorage.removeItem(TOKEN_KEY);
            } catch {
              // ignore
            }
          }
        }
      } catch {
        if (mounted) {
          setAdminUser(null);
          setAdminToken(null);
        }
      } finally {
        if (mounted) setIsAuthLoading(false);
      }
    };

    checkExistingToken();
    return () => {
      mounted = false;
    };
  }, [adminToken]);

  const login = async (email: string, pass: string) => {
    const res = await loginAdmin(email, pass);
    setAdminToken(res.token);
    setAdminUser(res.admin);
    try {
      localStorage.setItem(TOKEN_KEY, res.token);
    } catch {
      // ignore
    }
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setAdminUser(null);
    setAdminToken(null);
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // ignore
    }
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        adminToken,
        isAdminLoggedIn: !!adminUser && !!adminToken,
        isAuthLoading,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

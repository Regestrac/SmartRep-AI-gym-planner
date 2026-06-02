import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../helpers/types";
import { authClient } from "../lib/auth";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [neonUser, setNeonUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await authClient.getSession();
        if (result?.data?.user) {
          setNeonUser(result.data.user);
        }
      } catch {
        setNeonUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user: neonUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
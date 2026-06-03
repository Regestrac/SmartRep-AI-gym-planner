import { createContext, useContext, useEffect, useState } from "react";
import type { User, UserProfile } from "../helpers/types";
import { authClient } from "../lib/auth";
import { api } from "../lib/api";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  saveProfile: (profile: Omit<UserProfile, 'userId' | 'updatedAt'>) => Promise<void>;
  generatePlan: () => Promise<void>;
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

  const saveProfile = async (profileData: Omit<UserProfile, "userId" | "updatedAt">) => {
    if (!neonUser) {
      throw new Error("User must be authenticated to save profile");
    }

    await api.saveProfile(neonUser.id, profileData);
  };

  const generatePlan = async () => {
    if (!neonUser) {
      throw new Error("User must be authenticated to generate plan");
    }

    await api.generatePlan(neonUser.id);
  };

  return (
    <AuthContext.Provider value={{ user: neonUser, isLoading, saveProfile, generatePlan }}>
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
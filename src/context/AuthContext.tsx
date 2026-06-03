import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { TrainingPlan, User, UserProfile } from "../helpers/types";
import { authClient } from "../lib/auth";
import { api } from "../lib/api";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  plan: TrainingPlan | null;
  saveProfile: (profile: Omit<UserProfile, 'userId' | 'updatedAt'>) => Promise<void>;
  generatePlan: () => Promise<void>;
  refreshData: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [neonUser, setNeonUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plan, setPlan] = useState<TrainingPlan | null>(null);

  const isRefreshingRef = useRef(false);

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

  useEffect(() => {
    if (!isLoading) {
      if (neonUser?.id) {
        refreshData();
      } else {
        setPlan(null);
      }
      setIsLoading(false);
    }
  }, [neonUser?.id, isLoading]);

  const refreshData = useCallback(async () => {
    if (!neonUser || isRefreshingRef.current) {
      return;
    }
    isRefreshingRef.current = true;

    try {
      const planData = await api.getCurrentPlan(neonUser?.id).catch(() => null);
      if (planData) {
        setPlan({
          id: planData.id,
          userId: planData.userId,
          overview: planData.planJson.overview,
          weeklySchedule: planData.planJson.weeklySchedule,
          progression: planData.planJson.progression,
          version: planData.version,
          createdAt: planData.createdAt,
        })
      }

    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      isRefreshingRef.current = false;
    }
  }, [neonUser?.id]);

  const saveProfile = async (profileData: Omit<UserProfile, "userId" | "updatedAt">) => {
    if (!neonUser) {
      throw new Error("User must be authenticated to save profile");
    }

    await api.saveProfile(neonUser.id, profileData);
    await refreshData();
  };

  const generatePlan = async () => {
    if (!neonUser) {
      throw new Error("User must be authenticated to generate plan");
    }

    await api.generatePlan(neonUser.id);
    await refreshData();
  };

  return (
    <AuthContext.Provider
      value={{
        user: neonUser,
        isLoading,
        plan,
        saveProfile,
        generatePlan,
        refreshData,
      }}
    >
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
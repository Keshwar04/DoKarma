import supabase from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export const useAuth = () => {
  const { user, profile, setUser } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, profile, isAuthenticated: !!user };
};

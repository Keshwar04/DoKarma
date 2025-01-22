import { toast } from "@/hooks/use-toast";
import supabase from "@/lib/supabase";
import { Database } from "@/types/supabase/database.types";
import { AuthError, User } from "@supabase/supabase-js";
import { create } from "zustand";

type VerifyOTPType = "signup" | "recovery";
type ResendOTPType = "signup" | "email_change";

interface AuthState {
  user: User | null;
  loading: boolean;
  profile: Database["public"]["Tables"]["profiles"]["Row"] | null;
  signUp: (
    email: string,
    password: string,
    username: string
  ) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
  verifyOTP: (
    email: string,
    token: string,
    type: VerifyOTPType
  ) => Promise<any>;
  resendOTP: (email: string, type: ResendOTPType) => Promise<boolean>;
  setUser: (user: User | null) => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (
    data: Partial<Database["public"]["Tables"]["profiles"]["Row"]>
  ) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  profile: null,

  setUser: (user) => set({ user, loading: false }),

  signUp: async (email, password, username) => {
    try {
      // First check if user exists
      const { data: existingUser } = await supabase
        .from("profiles")
        .select()
        .eq("email", email)
        .single();

      if (existingUser) {
        toast({
          title: "Email already registered",
          description: "Please try logging in instead",
          status: "error",
        });
        return false;
      }

      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });

      console.log("Signup response:", { error, data }); // Debug log

      if (error) throw error;
      toast({
        title: "Verification email sent! Please check your inbox.",
        status: "success",
      });
      return true;
    } catch (error) {
      console.error("Signup error details:", {
        error,
        message: error instanceof Error ? error.message : "Unknown error",
        name: error instanceof Error ? error.name : "Unknown name",
      });

      if (error instanceof AuthError) {
        if (error.message.includes("already exists")) {
          toast({
            title: "Email already registered",
            description: "Please try logging in instead",
            status: "error",
          });
        } else {
          toast({
            title: "Error signing up",
            description: error.message,
            status: "error",
          });
        }
      } else {
        toast({
          title: "Error signing up",
          description: "An unexpected error occurred. Please try again.",
          status: "error",
        });
      }
      return false;
    }
  },

  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (data) return data;
    } catch (error) {
      console.error("Sign in error:", error);
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast({
        title: "Error signing in",
        description: message,
        status: "error",
      });
      return false;
    }
  },

  signOut: async () => {
    try {
      set({ user: null, profile: null }); // Clear state first
      const { error } = await supabase.auth.signOut({
        scope: "local",
      });
      if (error) {
        console.error("error:", error);
        if (error.message.includes("Auth session missing")) {
          // If session is already missing, just clear the state
          return;
        }
        throw error;
      }
    } catch (error) {
      console.error("Sign out error:", error);
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast({
        title: "Error signing out",
        description: message,
        status: "error",
      });
    }
  },

  resetPassword: async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      toast({ title: "Password reset email sent!" });
      return true;
    } catch (error) {
      console.error("Reset password error:", error);
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast({
        title: "Error resetting password",
        description: message,
        status: "error",
      });
      return false;
    }
  },

  updatePassword: async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      toast({ title: "Password updated successfully!" });
      return true;
    } catch (error) {
      console.error("Update password error:", error);
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast({
        title: "Error updating password",
        description: message,
        status: "error",
      });
      return false;
    }
  },

  verifyOTP: async (email, token, type) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type,
      });
      if (error) throw error;
      toast({ title: "Code verified successfully!", status: "success" });
      return data;
    } catch (error) {
      console.error("Verify OTP error:", error);
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast({
        title: "Error verifying code",
        description: message,
        status: "error",
      });
      return false;
    }
  },

  resendOTP: async (email, type) => {
    try {
      const { error } = await supabase.auth.resend({
        type,
        email,
      });
      if (error) throw error;
      toast({
        title: `${
          type === "signup" ? "Verification" : "Email change"
        } email resent!`,
        status: "success",
      });
      return true;
    } catch (error) {
      console.error("Resend OTP error:", error);
      const message =
        error instanceof Error ? error.message : "An error occurred";
      toast({
        title: "Error resending email",
        description: message,
        status: "error",
      });
      return false;
    }
  },

  fetchProfile: async () => {
    try {
      const user = get().user;
      if (!user?.id) return;
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      set({ profile });
    } catch (error) {
      console.error("Fetch profile error:", error);
      toast({
        title: "Error fetching profile",
        description:
          error instanceof Error ? error.message : "An error occurred",
        status: "error",
      });
    }
  },

  updateProfile: async (data) => {
    const user = get().user;
    if (!user?.id) return false;

    try {
      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", user.id);

      if (error) throw error;

      await get().fetchProfile();
      toast({ title: "Profile updated successfully!", status: "success" });
      return true;
    } catch (error) {
      console.error("Update profile error:", error);
      toast({
        title: "Error updating profile",
        description:
          error instanceof Error ? error.message : "An error occurred",
        status: "error",
      });
      return false;
    }
  },
}));

// Initialize auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  console.log("Auth state changed:", { event, session });
  useAuthStore.getState().setUser(session?.user ?? null);
});

import { CheckUserResponse} from "@/types/auth";
import supabase from "../lib/supabase"; // Import your Supabase client instance

export const login = async (
  username: string,
  password: string
): Promise<CheckUserResponse> => {
  try {
    const { data, error } = await supabase
      .from("master_trust_foundation")
      .select("id") // Select only fields you need
      .eq("username", username)
      .eq("password", password)
      .single();

    if (error) throw error;
    
    if (data) {
      return { success: true, message: "User exists", data };
    } else {
      return { success: false, message: "Invalid username or password" };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

import supabase from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./home/footer";
import FallbackUI from "@/components/utils/fallbackUI";

const Layout = () => {
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col px-4 sm:px-9 mt-[72px]">
        <Header />
        <Outlet />
        {isLoading && <FallbackUI />}
      </main>
      {!isLoading && <Footer />}
    </div>
  );
};

export default Layout;

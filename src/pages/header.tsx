import { Button } from "@/components/ui/button";
import Tooltips from "@/components/utils/tooltip";
import { getAvatarUrl } from "@/helper/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import AppLogo from "../components/utils/appLogo";
import DesktopMenu from "../components/utils/menu/desktopMenu";
import MobileMenu from "../components/utils/menu/mobileMenu";
import RandomAvatar from "../components/utils/randomAvatar";
// import { useCommonStore } from "@/store/zustand";
import styles from "../css/header.module.css";
import { menuList } from "../helper/menuList";
import { getDashboardCampaigns } from "@/store/campaignSlice";
import { useTrusts } from "@/hooks/useTrust";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [dashboardDatas, setDashboardDatas] = useState<any>([]);
  const [isVerifiedUser, setIsVerifiedUser] = useState<any>("");
  const [isLoading, setIsLoading] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  // const { accessToken, imgSeed } = useCommonStore();
  const { isAuthenticated, profile } = useAuth();
  const { user, signOut, fetchProfile } = useAuthStore();
  const { getOnboardingDetails } = useTrusts();

  const depthLevel = 0;
  const isOnboardingPath = location.pathname.includes("/onboarding");

  const handleClickOutside = (event: React.MouseEvent | MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setSidebar(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    document.body.innerHTML = "";
    localStorage.removeItem("accessToken");
    navigate("/");
    window.location.reload();
  };

  const profileNavigate = () => {
    navigate("/profile");
  };

  useEffect(() => {
    if (sidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebar]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getDashboardDetails();
    if (user?.id) {
      getVerifiedStatus();
    }
    // getVerifiedStatus();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(id);
  }, []);

  const getDashboardDetails = async () => {
    const data = await getDashboardCampaigns();
    setDashboardDatas(data);
  };
  const getVerifiedStatus = async () => {
    const isVerified = await getOnboardingDetails(user?.id || "");
    setIsVerifiedUser(isVerified);
  };

  const dashboardDatasLength = dashboardDatas?.length > 0;
  const isHomePath = location.pathname === "/";

  return (
    <nav className="border-b py-2 px-4 sm:px-9 shadow-xs -mx-4 sm:-mx-9">
      <div className="container w-full max-w-none px-0">
        <div className="grid grid-cols-12">
          <div className="col-span-6 md:col-span-10 flex items-center">
            <span
              className={`${styles.menu} ${
                isAuthenticated && isVerifiedUser ? "inline" : "hidden"
              } md:hidden me-2`}
            >
              <HiOutlineMenu size="25" onClick={() => setSidebar(true)} />
            </span>
            <div
              ref={navRef}
              className={`${styles.navMenu} ${
                sidebar ? styles.active : ""
              } border`}
            >
              <div className="px-8 border-b bg-[#f3f3f3] flex items-center h-[70px] mb-3">
                <AppLogo />
              </div>
              {/* e.title === "Home" */}
              {!isOnboardingPath &&
                menuList
                  .filter((e) => (isAuthenticated && isVerifiedUser ? e : null))
                  .filter(
                    (e) => !(e.title === "Dashboard" && !dashboardDatasLength)
                  )
                  .map((e: any, i: number) => (
                    <MobileMenu
                      key={i}
                      setSidebar={setSidebar}
                      item={e}
                      idx={i}
                    />
                  ))}
            </div>
            <AppLogo />
            {/* e.title === "Home" */}
            {!isOnboardingPath && (
              <ul className={`hidden md:flex ${styles.menus}`}>
                {menuList
                  .filter((e) => (isAuthenticated && isVerifiedUser ? e : null))
                  .filter(
                    (e) => !(e.title === "Dashboard" && !dashboardDatasLength)
                  )
                  .map((menu: any, index: number) => (
                    <DesktopMenu
                      key={index}
                      items={menu}
                      idx={index}
                      depthLevel={depthLevel}
                    />
                  ))}
              </ul>
            )}
          </div>
          <div className={`col-span-6 md:col-span-2 ${styles.navIcons}`}>
            {!isAuthenticated ? (
              <>
                <Button
                  className={`${
                    isHomePath ? "visible" : "invisible"
                  } bg-pimaryBtn font-normal hover:bg-primaryClr text-black text-md`}
                  onClick={() => navigate("/login")}
                >
                  NGO Login
                </Button>
              </>
            ) : (
              <>
                {!isLoading && (
                  <div className={`${isOnboardingPath && "hidden"}`}>
                    <Tooltips
                      txt={
                        <div
                          className={`${
                            location.pathname === "/profile" &&
                            "border-2 border-[#fcd34d]"
                          }
                      ${styles.bgRound}`}
                          onClick={profileNavigate}
                        >
                          {profile?.avatar_url ? (
                            <img
                              src={getAvatarUrl(profile.avatar_url, "")}
                              alt="Profile"
                              className="w-[30px] h-[30px] rounded-full object-cover"
                            />
                          ) : (
                            <RandomAvatar
                              seed={profile?.username || "do_karma"}
                              width="30"
                              bg=""
                            />
                          )}
                        </div>
                      }
                      hoverTxt="Profile"
                    />
                  </div>
                )}
                {/* <Tooltips txt={
                  <div className={`${location.pathname == '/profile' && 'border-2 border-[#fcd34d]'} 
                  ${styles.bgRound}`} onClick={() => navigate('/profile')}>
                    <RandomAvatar seed={imgSeed || 'Vivian'}
                      width='30' bg='' />
                  </div>}
                  hoverTxt='Profile' /> */}
                <Tooltips
                  txt={
                    <div className={styles.bgSquare} onClick={handleLogout}>
                      <LogOut size="22" color="gray" />
                    </div>
                  }
                  hoverTxt="Logout"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

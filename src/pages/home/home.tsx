import BannerAutoPlay from "./bannerAutoPlay";
import OpenPartneship from "./openPartneship";
import FunderRaiser from "./funderRaiser";
import MonthlySupport from "./monthlySupport";
// import NgoPlatform from "./ngoPlatform";
import NewsLetter from "./newsLetter";
import SocialChange from "./socialChange";
// import Footer from "./footer";
import Blogs from "./blogs";
import { useEffect, useRef, useState } from "react";
import FallbackUI from "@/components/utils/fallbackUI";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      {isLoading && <FallbackUI />}
      {!isLoading && (
        <div>
          <BannerAutoPlay />
          <FunderRaiser targetRef={targetRef} />
          <MonthlySupport />
          {/* <NgoPlatform /> */}
          <Blogs />
          <NewsLetter />
          <SocialChange targetRef={targetRef} />
          <OpenPartneship targetRef={targetRef} />
          {/* <Footer /> */}
        </div>
      )}
    </>
  );
};

export default Home;

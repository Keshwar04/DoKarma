import FavouritesCard from "@/components/ui-components/profile/favourites/donateCard";
import { useEffect, useState } from "react";
// import { ChevronRight } from "lucide-react";
// import { PiggyBank } from 'lucide-react';
// import { FilePenLine } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
import { staticText } from "@/helper/staticText";
import { useCampaigns } from "@/hooks/useCampaign";
import { Campaign } from "@/types/campaign";
import HomeTitle from "@/components/utils/text/homeTitle";
import { useLocation, useNavigate } from "react-router-dom";

const FunderRaiserMontly = ({ targetRef }: any) => {
  const [favourites, setFavourites] = useState<Campaign[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);
  // const navigate = useNavigate();
  // const icons = [<FilePenLine size='18' />, <PiggyBank size='20' />, <PiggyBank size='20' />]
  // const icons = Array.from({ length: 10 }, () => (<PiggyBank size='20' />));
  // const mergedFavList = donateList.map((e, i) => ({ ...e, icon: icons[i] }))

  // useEffect(() => {
  //     const updatedProgress = [70, 60, 80, 20, 30, 65, 15, 90, 35, 10];
  //     const finalFavList = mergedFavList.map((e, i) => ({ ...e, progress: updatedProgress[i] }))
  //     const timer = setTimeout(() => setFavourites(finalFavList), 500)
  //     return () => clearTimeout(timer)
  // }, [])
  const { campaigns: campaignsData, loading, error } = useCampaigns();
  useEffect(() => {
    if (campaignsData) {
      setFavourites(campaignsData);
    }
  }, [campaignsData, loading, error]);

  return (
    <div ref={targetRef}>
      <HomeTitle txt="Karma Begins with Kindness" />
      <div className="flex justify-between items-center  mb-8">
        <p className="md:text-[20px] text-[#666]">{staticText.pick}</p>
        {/* <Button
          variant="outline"
          className="hover:border-primaryClr active:bg-primaryClr"
          onClick={() => navigate("/donate")}
        >
          View All&nbsp;
          <ChevronRight size="18" />
        </Button> */}
      </div>
      <div
        id="campaigns"
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {favourites
          .filter((e: any) => e.is_priority)
          .slice(0, 3)
          .map((e: any) => (
            <div
              key={e.id}
              className="transition-transform duration-200 transform 
                hover:scale-105 cursor-pointer group"
              onClick={() =>
                navigate("donation/" + e.campaign_name.replace(/\s+/g, "-"))
              }
            >
              <FavouritesCard
                types={{ view: "Grid" }}
                ele={e}
                isHomeLink="donate"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FunderRaiserMontly;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
// import { staticText } from '@/helper/staticText';
import { Button } from "@/components/ui/button";
import BgImageShare from "@/components/utils/bgImageShare";
import DonateShare from "@/components/utils/donateShare";
import RandomAvatar from "@/components/utils/randomAvatar";
import { CampaignWithTrust } from "@/types/campaign.d";
import { Timer, TriangleAlert, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
interface props {
  ele: CampaignWithTrust;
  types: any;
  isSingle?: boolean;
  isHomeLink?: string;
}
const FavouritesCard: React.FC<props> = ({
  ele,
  types,
  isSingle,
  isHomeLink,
}) => {
  // console.log(typeof ele.received_amount);
  const { profile } = useAuth();
  const [toggle, setToggle] = useState<any>({
    fav: false,
    textChange: false,
    zoom: true,
  });
  const isListView = types.view == "List";
  const progressAbove = `text-[#666666] text-sm bg-[#f2f2f2] px-2  py-1 my-1 rounded flex items-center`;
  const navigate = useNavigate();

  const memoizeDaysRemaining = (() => {
    const cache: { [key: string]: string } = {};

    return function calculateDaysRemaining(endDate: string): string {
      // If the result for this endDate is already cached, return it
      if (cache[endDate]) {
        return cache[endDate];
      }
      if (!endDate) return "Ongoing";

      const end = new Date(endDate);
      const now = new Date();

      // Calculate the difference in milliseconds
      const differenceInTime = end.getTime() - now.getTime();

      // Convert milliseconds to days
      const differenceInDays = Math.ceil(
        differenceInTime / (1000 * 60 * 60 * 24)
      );

      // Determine the message based on the days remaining
      let result: string;
      if (differenceInDays > 0) {
        result = `${differenceInDays} days remaining`;
      } else if (differenceInDays === 0) {
        result = "Today is the last day";
      } else {
        result = "Date has passed";
      }

      // Store the result in the cache before returning it
      cache[endDate] = result;

      return result;
    };
  })();

  const handleNavigate = (link: any) => {
    isHomeLink
      ? navigate(`${isHomeLink}/payment/${link}`)
      : navigate(`payment/${link}`);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setToggle((prev: any) => ({ ...prev, zoom: false }));
      setTimeout(() => {
        setToggle((prev: any) => ({ ...prev, textChange: !prev.textChange }));
        setToggle((prev: any) => ({ ...prev, zoom: true }));
      }, 300);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [toggle]);

  return (
    <Card fav={"Grid"}>
      <div
        className={
          isSingle ? "p-2" : types.view == "List" ? "flex px-3 pt-3" : ""
        }
      >
        <BgImageShare
          bgImg={ele.cover_image}
          view={types.view}
          ele={ele}
          isSingle={isSingle}
        />
        <div
          className={`${isSingle && "mt-3"} ${
            isListView ? "flex-1" : "pt-3"
          } px-3`}
        >
          <CardTitle className="line-clamp-2 leading-tight text-[20px]">
            {ele.campaign_name}
          </CardTitle>
          <div
            className={`flex justify-between items-center ${
              isListView ? "mb-4" : "my-4"
            }`}
          >
            <div className="flex gap-2 items-center">
              <RandomAvatar seed={profile?.avatar_url} width="33" />
              <p className="text-cardContent text-[#666666]">
                {ele?.master_trust_foundation.trust_name}
              </p>
            </div>
            {ele.is_urgent && (
              <p
                className="hidden text-[#E7424B] text-[14px] group-hover:flex urgent-fund
                             p-2 rounded items-center"
              >
                <TriangleAlert size="16" />
                &nbsp; Urgent Need
              </p>
            )}
            <div className="transition-transform duration-300 ease-in-out group-hover:hidden">
              {toggle.textChange ? (
                <div className={progressAbove}>
                  <Users size="16" /> &nbsp;{ele?.no_of_donations || 0}{" "}
                  Donations
                  {/* <Users size="16" /> &nbsp;{ele?.donations || 0} Donations */}
                </div>
              ) : (
                <p className={`${progressAbove} group-hover:hidden`}>
                  <Timer size="16" />
                  &nbsp;{memoizeDaysRemaining(ele.end_date)}
                  {/* &nbsp;{ele.days || 0} */}
                </p>
              )}
            </div>
            <div className="hidden group-hover:flex gap-3">
              <DonateShare
                setToggle={setToggle}
                toggle={toggle}
                url={"donate/payment/" + ele.campaign_name.replace(/\s+/g, "-")}
              />
            </div>
          </div>
          <div className="justify-between hidden group-hover:flex">
            <div className={`${progressAbove}`}>
              <Users size="16" /> &nbsp;{ele.no_of_donations} Donations
              {/* <Users size="16" /> &nbsp;{ele.donations} Donations */}
            </div>
            <p className={`${progressAbove}`}>
              <Timer size="16" />
              &nbsp;{memoizeDaysRemaining(ele.end_date)}
              {/* &nbsp;{ele.days} */}
            </p>
          </div>
          <Progress
            value={ele.progress_percentage}
            className="w-[100%] mt-6 group-hover:hidden"
            outer="primary"
            inner="primary"
            height="h-2.5"
          />
          <div className="flex justify-between items-center mb-5 mt-1 group-hover:hidden">
            <div className="flex items-center">
              <p className="font-semibold text-[22px]">
                ₹{ele.received_amount.toLocaleString("en-IN")}
                {/* {ele.icon?.type == PiggyBank && `₹`} */}
              </p>
              <p className="text-xs text-[#60A5FA]">
                &nbsp;({Math.floor(ele.progress_percentage)}%)
              </p>
            </div>
            <p className="text-sm text-[#666666]">
              &nbsp;Target : {`₹`}
              {/* &nbsp;Target : {ele.icon?.type == PiggyBank && `₹`} */}
              {`${ele.target_amount.toLocaleString("en-IN")}`}
            </p>
          </div>
          <div className="group-hover:h-[auto] group-hover:mb-3 group-hover:mt-5">
            <Button
              id="btn"
              className="bg-pimaryBtn hover:bg-primaryClr text-black w-full h-[40px]
                    hidden group-hover:block text-md"
              onClick={(eve) => {
                eve.stopPropagation();
                handleNavigate(ele.campaign_name.replace(/\s+/g, "-"));
              }}
            >
              Donate Now
            </Button>
            {ele.is_urgent ? (
              <div
                className={`flex items-center justify-center urgent-fund text-[#E7424B]
                             -mx-3 ${
                               isListView && "-me-6 mt-6"
                             } py-2 group-hover:hidden font-semibold rounded-b-lg`}
              >
                <TriangleAlert />
                &nbsp; Urgent Need of Funds
              </div>
            ) : (
              <div
                className={`${isListView ? "" : "h-[40px]"}
                            group-hover:hidden`}
              ></div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FavouritesCard;

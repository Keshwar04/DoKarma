/**
 * AllCampaigns Component
 *
 * This component displays a list of campaign cards with search and filtering functionality.
 * It uses the CampaignsSearch, CampaignFilter, and CampaignsCard components.
 *
 * Features:
 * - Renders a grid of campaign cards
 * - Implements campaign filtering (In Progress, Concluded, All)
 * - Responsive layout for different screen sizes
 * - Uses mock data from cardDatas for demonstration
 *
 * State:
 * - campaigns: Array of campaign data
 * - filtering: Current filter state ('In Progress', 'Concluded', or '')
 *
 * The number of displayed cards varies based on the filter:
 * - 'In Progress': 5 cards
 * - 'Concluded': 7 cards
 * - All (default): 10 cards
 */

import { Campaign } from "@/types/campaign";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CampaignFilter from "./campaignFilter";
import CampaignsCard from "./campaignsCard";
// import CampaignsSearch from "./campaignsSearch";
// import { useCampaigns } from "@/hooks/useCampaign";
// import FallbackUI from "./fallbackUI";
import { getDashboardCampaigns } from "@/store/campaignSlice";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  // const [filtering, setFiltering] = useState("");
  // console.log(filtering);

  const navigate = useNavigate();
  const [length, setLength] = useState(0);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const res = await getDashboardCampaigns();
    if (res === "no_auth" || res === null) {
      // localStorage.removeItem("accessToken");
      localStorage.removeItem("trust_id");
      // navigate("/");
      // window.location.reload();
    } else {
      setCampaigns(res as unknown as Campaign[]);
      setLength(res.length);
    }
  };

  return (
    <>
      {/* <CampaignsSearch /> */}
      <div className="mt-[15px]">
        <div className="border shadow rounded my-5 py-1 md:py-3 px-1 md:px-6">
          <CampaignFilter
            total={length}
            setCampaigns={setCampaigns}
            cardDatas={campaigns}
            // setFiltering={setFiltering}
            // allCampaign={true}
          />
          <div className="grid grid-cols-12 gap-4">
            {campaigns.map((cur) => (
              <div
                className="col-span-12 md:col-span-6 lg:col-span-4 p-3"
                key={cur.id}
              >
                <div
                  className="w-full sm:w-[72%] md:w-full mx-auto cursor-pointer
                                    transition-transform duration-200 transform hover:scale-105"
                  onClick={() =>
                    navigate(
                      "/donation/" + cur.campaign_name.replace(/\s+/g, "-")
                    )
                  }
                >
                  <CampaignsCard ele={cur} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCampaigns;

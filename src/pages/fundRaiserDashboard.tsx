/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Campaigns component
 *
 * This component displays a comprehensive view of campaigns and related activities.
 * It includes:
 * - A search functionality (CampaignsSearch)
 * - A grid of campaign cards with filtering options
 * - A sidebar showing recent activities
 * - Export and Invite buttons
 * - A summary of total statistics
 *
 * Key features:
 * - Responsive layout adapting to different screen sizes
 * - Dynamic rendering of campaign cards and activity feed
 * - Integration with routing for navigation
 * - Use of custom UI components (Button, Dialog, Popover)
 * - State management using useState and Zustand store
 *
 * The component handles various user interactions and provides
 * a rich interface for managing and viewing campaign information.
 */

// import { CirclePlus, CloudUpload } from "lucide-react";
// import {  EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import styles from "../css/campaigns.module.css";
// import CampaignsSearch from '../components/utils/campaignsSearch';
import { useCommonStore } from "../store/zustand";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Campaign } from "@/types/campaign";
// import SuperDashoard from './superDashoard';
import { getDashboardCampaigns } from "@/store/campaignSlice";
import { getDashboardDonations } from "@/store/donationSlice";
import { DonationDataForDashboard } from "@/types/donation.d";
import CampaignFilter from "../components/utils/campaignFilter";
import CampaignsCard from "../components/utils/campaignsCard";
// import InviteDialog from "../components/utils/dialog/invite";
// import Views from "../components/utils/popover/views";
import RandomAvatar from "../components/utils/randomAvatar";
import { fecthScreenSize } from "../logics/screenSize";
import { useTrusts } from "@/hooks/useTrust";
const Campaigns = () => {
  const [isEnable, setIsEnable] = useState({ popup: false, showAll: false });
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [donations, setDonations] = useState<DonationDataForDashboard[]>([]);
  const [item1Height, setItem1Height] = useState(0);
  const { getTrust } = useTrusts();
  const { innerWidth, accessToken } = useCommonStore();
  const navigate = useNavigate();
  const popupRef = useRef<HTMLDivElement>(null);
  const item1Ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsEnable({ ...isEnable, popup: false });
    }
  };

  fecthScreenSize();

  useEffect(() => {
    if (isEnable.popup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  }, [isEnable.popup]);

  useEffect(() => {
    if (item1Ref.current) {
      setItem1Height(item1Ref.current.offsetHeight);
    }
  }, [campaigns]);

  const fetchCampaigns = async () => {
    const res = await getDashboardCampaigns();
    console.log(res);

    if (res === "no_auth" || res === null) {
      // localStorage.removeItem("accessToken");
      localStorage.removeItem("trust_id");
      // navigate("/");
      // window.location.reload();
    } else setCampaigns(res as unknown as Campaign[]);
  };
  // console.log(campaigns);

  const fetchDonations = async (userId: string) => {
    // console.log(userId);

    const res = await getDashboardDonations(userId);
    console.log(res);

    if (res === "no_auth" || res === null) {
      // localStorage.removeItem("accessToken");
      localStorage.removeItem("trust_id");
      // navigate("/");
      // window.location.reload();
    } else setDonations(res as unknown as DonationDataForDashboard[]);
  };

  const campaignsLen = campaigns.length == 4 ? 9 : 4;
  const getactivitesLen = () => {
    if (innerWidth > 1023) {
      return isEnable.showAll ? donations?.length : campaignsLen;
    } else {
      return donations?.length;
    }
  };
  const activitiesLen = getactivitesLen();

  function extractStatistics(data: DonationDataForDashboard[]) {
    const totalAmount = data.reduce(
      (acc, donation) => acc + donation.total_amount,
      0
    );
    // const totalDonations = data.length;
    // const totalDonors = new Set(data.map((donation) => donation.email));

    return [
      { text: "Donations", value: `₹${totalAmount}`, view: "View Analytics" },
      // { text: "Signatures", value: "1028", view: "View Report" },
      { text: "Donors", value: `${donations.length}`, view: "View Analytics" },
      // { text: "Views", value: "10,280", view: "View Report" },
      // { text: "All", value: "1,876", view: "View Analytics" },
    ];
  }

  const asyncFunctions = async () => {
    const res = await getTrust(accessToken);
    fetchDonations(res[0].id);
  };

  console.log(campaigns);

  useEffect(() => {
    fetchCampaigns();
    asyncFunctions();
  }, []);

  return (
    <>
      {/* <CampaignsSearch /> */}
      {/* <SuperDashoard /> */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-6">
        {extractStatistics(donations).map((e) => (
          <div key={e.text}>
            <div
              className="border rounded shadow-sm relative
              transition-transform duration-200 transform hover:scale-105"
            >
              <div className="p-3 border-b">
                <div className="flex justify-between">
                  <div>
                    <p className={styles.listText}>{e.text}</p>
                    <p className={styles.listValue}>{e.value}</p>
                  </div>
                  {/* <Popover>
                    <PopoverTrigger asChild>
                      <EllipsisVertical
                        className={`${styles.curs}`}
                        size="22"
                      />
                    </PopoverTrigger>
                    <Views />
                  </Popover> */}
                </div>
              </div>
            </div>
            {/* <div className='p-2 md:p-3 text-right'>
                  <span className={styles.listViews}>{e.view}</span>
                </div> */}
          </div>
        ))}

        {/* </div> */}
      </div>
      <div className="container w-full max-w-none px-0 mt-4 py-4">
        <div className="flex flex-wrap">
          <div className="px-0 w-full lg:w-9/12">
            <div
              ref={item1Ref}
              className={`${styles.boxShadow} border rounded`}
            >
              <CampaignFilter
                setCampaigns={setCampaigns}
                cardDatas={campaigns}
                total={campaigns.length}
              />
              <div className="px-4 pb-3 flex flex-col md:flex-row flex-wrap border-b">
                {campaigns.slice(0, 4).map((e) => (
                  <div
                    key={e.id}
                    className="w-full md:w-[49%] sm:px-3
                       sm:me-auto flex flex-col my-1 transition-transform duration-200 transform
                       hover:scale-105"
                  >
                    <div
                      className="my-3 cursor-pointer"
                      onClick={() =>
                        navigate(
                          "donation/" + e.campaign_name.replace(/\s+/g, "-")
                        )
                      }
                    >
                      <CampaignsCard ele={e} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 flex justify-end items-center">
                <Button
                  variant="outline"
                  className="hover:border-primaryClr active:bg-primaryClr"
                  onClick={() => navigate("all-campaigns")}
                >
                  Manage All Campaigns
                </Button>
              </div>
            </div>
          </div>
          <div
            style={{ height: innerWidth > 1023 ? item1Height : "" }}
            className="mb-0 w-full lg:w-3/12 mt-5 lg:mt-0"
          >
            <div
              style={{ width: innerWidth < 1024 ? "100%" : "93%" }}
              className={`lg:ms-auto lg:mr-0 h-[100%] ${
                campaigns.length === 0 ? "py-0" : "py-0"
              }`}
            >
              {/* <div
                className={`${
                  campaigns.length === 4
                    ? "lg:h-[8%]"
                    : campaigns.length === 0
                    ? "lg:h-[35%]"
                    : "lg:h-[6%]"
                }
                   flex justify-between ${
                     campaigns.length === 0 ? "my-0" : "my-5 lg:my-0"
                   }`}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:border-primaryClr active:bg-primaryClr"
                >
                  <CloudUpload size="18" />
                  &nbsp; Export Report
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:border-primaryClr active:bg-primaryClr"
                    >
                      <CirclePlus size="18" />
                      &nbsp; Invite
                    </Button>
                  </DialogTrigger>
                  <InviteDialog />
                </Dialog>
              </div> */}
              {/* ${
                  campaigns.length === 4 ? "lg:h-[92%]" : "lg:h-[94%]"
                } */}
              <div
                className={`
                   h-[100%] border shadow rounded-[4px] p-3 flex lg:flex-col text-nowrap 
                    overflow-auto scrollbarHide relative`}
              >
                {donations.length === 0 ? (
                  <h1 className="font-bold text-[20px] text-center lg:mt-5 w-full">
                    No donors
                  </h1>
                ) : (
                  <>
                    {donations.slice(0, activitiesLen).map((e, idx) => (
                      <div
                        key={idx}
                        className="flex flex-wrap mr-4 lg:me-0 overflow-hidden whitespace-nowrap text-ellipsis"
                      >
                        <div className="flex flex-col">
                          {/* <div className="bg-primaryClr w-[37px] h-[37px] rounded-[50%] 
                        flex justify-center items-center"> */}
                          <RandomAvatar seed={e.donor_name} width="33" />
                          {/* </div> */}
                          <div
                            className={`flex-grow border-l mx-auto 
                          ${donations.length - 1 == idx ? "hidden" : "block"}`}
                          />
                        </div>
                        <div
                          title={`${e.donor_name} | ${e.campaign_details.category}`}
                          className="ms-0 lg:ms-2 mt-2 lg:mt-0 pb-4"
                        >
                          <p className={styles.personName}>{e.donor_name}</p>
                          <p className={styles.personArea}>
                            {e.billing_address.slice(0, 5)} |{" "}
                            {e.campaign_details.category}
                          </p>
                          <p className={styles.personAmount}>
                            ₹ {e.total_amount}
                          </p>
                        </div>
                        {e.campaign_details.category !== "Social Welfare" && (
                          <div
                            className="w-[10px] h-[10px] bg-[#12B76A] rounded-full
                      ml-auto hidden lg:block"
                          />
                        )}
                      </div>
                    ))}
                  </>
                )}

                {donations.length > 7 && !isEnable.showAll && (
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${isEnable.showAll ? "sticky" : "absolute"} 
                     bottom-3 right-[33%] hidden lg:block hover:border-primaryClr active:bg-primaryClr`}
                    onClick={() => setIsEnable({ ...isEnable, showAll: true })}
                  >
                    View More
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Campaigns;

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Donation component for DoKarma
 *
 * Renders a detailed donation campaign page with:
 * - Campaign information and description
 * - Creator and supporter details
 * - Donation progress and recent donors
 * - Campaign settings and actions
 *
 * Uses various UI components and dialogs for interactivity.
 * Implements responsive design for different screen sizes.
 */

import { useEffect, useRef, useState } from "react";
import { BadgeCheck } from "lucide-react";
import logo from "../assets/logo.png";
import styles from "../css/donation.module.css";
// import { supporters } from "../helper/helper";
// import approved from "../assets/approved.png";
// import { IoFlag } from "react-icons/io5";
// import CampaignsSearch from "../components/utils/campaignsSearch";
// import { useCommonStore } from "../store/zustand";
import { fecthScreenSize } from "../logics/screenSize";
// import { Input } from "../components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useNavigate } from "react-router-dom";
// import EndCampaign from "../components/utils/dialog/endCampaign";
// import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import CampaignCreator from "../components/utils/dialog/creator";
// import ContactSupport from "../components/utils/dialog/contactSupport";
// import { staticText } from "@/helper/staticText";
import RandomAvatar from "../components/utils/randomAvatar";
import DonateShare from "../components/utils/donateShare";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { CampaignWithDonationTransactions } from "@/types/campaign.d";
// import { CreateCampaign } from "@/types/campaign.d";
// import { useFormStore, useMenuStore } from "../store/zustand";
// import { useToast } from "@/hooks/use-toast";
// import { useCampaigns } from "@/hooks/useCampaign";
import { getCampaignById } from "@/store/campaignSlice";
// import supabase from "@/lib/supabase";
import { calculateLines } from "@/logics/logics";
const Donation = () => {
  const [campaign, setCampaign] = useState<any>(null);
  const [lineCount, setLineCount] = useState<any>(0);
  // const [updateCampaignData, setUpdateCampaignData] = useState({
  //   amount_input: 0,
  //   thankyou_note: "",
  // });
  const [progress, setProgress] = useState(0);
  const [isEnable, setIsEnable] = useState({
    readMore: false,
    showMore: false,
  });
  // const { innerWidth } = useCommonStore();
  // const { updateCampaignById } = useCampaigns();
  // const navigate = useNavigate()
  const { campaign_name } = useParams();
  const navigate = useNavigate();
  const elementRef = useRef<HTMLDivElement | null>(null);
  const campaignNameWithSpaces = campaign_name?.replace(/-/g, " ");
  fecthScreenSize();
  // const handleChange = (e: any) => {
  //   const { name, value } = e.target
  //   setDonationDatas({ ...donationDatas, [name]: value })
  // }
  useEffect(() => {
    if (campaign) {
      const timer = setTimeout(
        () =>
          setProgress(
            campaign?.progress_percentage >= 100
              ? 100
              : campaign.progress_percentage
          ),
        500
      );
      return () => clearTimeout(timer);
    }
  }, [campaign]);
  // console.log(campaign?.progress_percentage);

  // const handleClick = () => {
  //   const isFormValid = donationDatas.amount && donationDatas.note
  //   toast({
  //     title: isFormValid ? staticText.successMsg : staticText.errMsg,
  //     status: isFormValid ? 'success' : 'error'
  //   })
  // }

  // const fetchAvatarUrl = async (id: string) => {
  //   if (id) {
  //     const { data, error } = await supabase
  //       .from("profiles")
  //       .select("*")
  //       .eq("id", id)
  //       .single();
  //     if (data) console.log(data);
  //     if (error) console.log(error);
  //   }
  // };

  const fetchCampaignByName = async (id: string) => {
    try {
      const data = await getCampaignById(id);
      if (data === ("no_auth" as any)) {
        // localStorage.removeItem("accessToken");
        localStorage.removeItem("trust_id");
        // navigate("/");
        window.location.reload();
      }
      if (!data) {
        toast({
          status: "error",
          title: "Error",
          description: "Campaign not found",
        });
        return;
      }

      setCampaign(data as unknown as CampaignWithDonationTransactions);
    } catch (err: any) {
      console.error(err.message);
      toast({
        status: "error",
        title: "Error",
        description: err.message,
      });
    }
  };

  // const handleUpdateFieldsChange = (e: any) => {
  //   const { name, value } = e.target;

  //   setUpdateCampaignData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleUpdateCampaign = async () => {
  //   if (!updateCampaignData.amount_input || !updateCampaignData.thankyou_note) {
  //     toast({
  //       status: "error",
  //       title: "Error",
  //       description:
  //         "Amount should be non zero and thank you message should not be empty.",
  //     });
  //   } else {
  //     let data: Partial<CreateCampaign> = {
  //       thankyou_note: updateCampaignData.thankyou_note,
  //     };
  //     const amount = Number(updateCampaignData.amount_input);
  //     if (campaign) {
  //       if (amount > campaign.target_amount) {
  //         return toast({
  //           status: "error",
  //           title: "Error",
  //           description: "Amount should be less than target amount.",
  //         });
  //       }
  //       if (campaign.amount_type === "Fixed") {
  //         data = {
  //           ...data,
  //           fixed_amount: amount,
  //         };
  //       } else {
  //         data = {
  //           ...data,
  //           minimum_amount: amount,
  //         };
  //       }
  //       await updateCampaignById(campaign?.id, data);

  //       toast({
  //         variant: "default",
  //         title: "Success",
  //         description: "Campaign updated successfully",
  //       });
  //       setUpdateCampaignData({
  //         amount_input: 0,
  //         thankyou_note: "",
  //       });
  //       await fetchCampaignByName(campaign.id);
  //     }
  //   }
  // };

  // const handleEndCampaign = () => {
  //   toast({
  //     title: "Your campaign has ended ",
  //   });
  // };

  useEffect(() => {
    const timer = setTimeout(() => setProgress(0), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // fetchAvatarUrl(campaign?.master_trust_foundation.id);
  }, [campaign?.master_trust_foundation.id]);

  useEffect(() => {
    if (campaign) {
      const timer = setTimeout(
        () => setProgress(campaign?.progress_percentage),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [campaign]);

  useEffect(() => {
    if (campaignNameWithSpaces) {
      fetchCampaignByName(campaignNameWithSpaces);
    }
  }, [campaignNameWithSpaces]);
  useEffect(() => {
    if (campaign?.description) {
      const count = calculateLines(elementRef);
      setLineCount(count);
    }
  }, [campaign?.description]);
  // console.log(typeof campaign.progress_percentage);
  // console.log(campaign?.description);

  return (
    <>
      {/* <CampaignsSearch /> */}
      <div className="py-4">
        <div className="mb-4 sm:mb-2 flex flex-col sm:flex-row justify-between items-start">
          <h1 className={styles.head}>{campaign?.campaign_name}</h1>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7 lg:col-span-8">
            <img
              src={campaign?.cover_image}
              className={`h-[300px] sm:h-[538px]  ${styles.momBaby}`}
              alt={campaign?.campaign_name}
            />

            {/* <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:border-primaryClr active:bg-primaryClr"
                >
                  Contract
                </Button>
              </DialogTrigger>
              <CampaignCreator />
            </Dialog> */}
            {/* <div className={styles.yellowCircle}>
                                                    <img src={e.img} />
                                                </div> */}
            {/* <div className="my-3 py-3 border-t border-b">
              <p className={`${styles.creator} mb-2`}>Supporters</p>
              <div
                id="eefef"
                className="h-[263px] overflow-scroll scrollbarHide"
              >
                {Array.from({
                  length: isEnable.showMore ? 10 : innerWidth < 640 ? 2 : 3,
                }).map((_, index) => {
                  const e = supporters[index % supporters.length];
                  return (
                    <div
                      key={index}
                      className="flex py-3 border-b last:border-b-0 last:pb-0"
                    >
                      
                      <RandomAvatar seed={e.name} width="40" />
                      <div className={`${styles.suppotersHead}`}>
                        <p className={styles.personName}>{e.name}</p>
                        <p className={styles.amt}>
                          {e.amt} &nbsp;
                          <span className={styles.blackCircle} />
                          &nbsp; {e.location}
                        </p>
                        <p className={`block sm:hidden ${styles.action}`}>
                          {e.action}
                        </p>
                      </div>
                      <p className={`hidden sm:block ${styles.action}`}>
                        {e.action}
                      </p>
                    </div>
                  );
                })}
                {!isEnable.showMore && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 hover:border-primaryClr active:bg-primaryClr"
                    onClick={() => setIsEnable({ ...isEnable, showMore: true })}
                  >
                    Show more
                  </Button>
                )}
              </div>
            </div> */}
          </div>
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <Button
              className="bg-pimaryBtn hover:bg-primaryClr text-black text-md w-full"
              onClick={() =>
                navigate(
                  `/donate/payment/${campaign?.campaign_name.replace(
                    /\s+/g,
                    "-"
                  )}`
                )
              }
            >
              Donate Now
            </Button>
            <div className={`p-3 mt-3 border rounded ${styles.boxShadow}`}>
              <div className="flex justify-between items-center">
                <p className={styles.donation}>Received Donations</p>
                <div className="flex gap-x-3">
                  <DonateShare
                    isDonationShare={true}
                    url={
                      "donate/payment/" +
                      campaign?.campaign_name.replace(/\s+/g, "-")
                    }
                  />
                </div>
              </div>
              <div className="my-3">
                <span className={styles.donationAmt}>
                  ₹&nbsp;{campaign?.received_amount || 0} /&nbsp;
                </span>
                <span className={styles.donationTotalAmt}>
                  ₹&nbsp;{campaign?.target_amount}
                </span>
              </div>
              <Progress
                value={progress}
                className="w-[100%]"
                outer="primary"
                inner="primary"
                height="h-2.5"
              />
              <p className={`my-3 ${styles.desc}`}>
                {campaign?.progress_percentage
                  ? campaign?.progress_percentage.toFixed(1)
                  : 0}
                % | {campaign?.no_of_donations} Donor(s)
              </p>
              <div className="overflow-auto h-[300px] scrollbarHide">
                {campaign?.donation_transaction?.map((e: any) => (
                  <div key={e.id} className="flex items-center mb-3">
                    {/* <div className={styles.yellowCircle}> */}
                    <RandomAvatar seed={e.donor_name} width="40" />
                    {/* </div> */}
                    <div className="ms-3">
                      <p className={styles.personName}>{e.donor_name}</p>
                      <p className={styles.amt}>
                        {e.total_amount - e.tip_amt} &nbsp;
                        <span className={styles.blackCircle} /> &nbsp;
                        <span className={styles.status}>
                          {" "}
                          {timeAgo(e.created_at)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className={`my-3 p-3 border rounded ${styles.boxShadow}`}>
              <p className={`${styles.donation} mb-2`}> Campaign Settings</p>
              <Label>Donation</Label>
              <Input
                type="number"
                className="mt-2"
                name="amount_input"
                value={updateCampaignData.amount_input}
                onChange={handleUpdateFieldsChange}
              />
              <p className={`mt-1 ${styles.graySmall}`}>
                {campaign?.amount_type === "Fixed" ? "Fixed" : "Minimum Amount"}
              </p>
              <Label className="flex items-center">Thank you Note &nbsp;</Label>
              <Textarea
                className="mt-3"
                name="thankyou_note"
                onChange={handleUpdateFieldsChange}
                value={updateCampaignData.thankyou_note}
              />
              <p className={`mt-1 mb-3 ${styles.graySmall}`}>
                Show some gratitude :)
              </p>
              <Button
                className={`${styles.saveBtn} bg-pimaryBtn hover:bg-primaryClr text-black`}
                onClick={handleUpdateCampaign}
              >
                SAVE
              </Button>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#DC2626] hover:bg-[#B91C1C] w-full">
                  END CHAMPION
                </Button>
              </DialogTrigger>
              <EndCampaign handleEndCampaign={handleEndCampaign} />
            </Dialog> */}
          </div>
        </div>
        <p
          ref={elementRef}
          className={`mt-3 whitespace-pre-line ${
            !isEnable.readMore && "line-clamp-4 "
          } 
                               ${styles.desc}`}
        >
          {campaign?.description}
        </p>
        {lineCount >= 4 && (
          <>
            {!isEnable.readMore && (
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => setIsEnable({ ...isEnable, readMore: true })}
              >
                Read More
              </Button>
            )}
          </>
        )}
        <div className="grid grid-cols-12 my-3 pt-3 border-t">
          <div className="col-span-12 sm:col-span-6">
            <h1 className={styles.creator}>Campaign Creator</h1>
            <div className="flex justify-between mt-4">
              <div className="flex items-center gap-3">
                <RandomAvatar seed="Kingston" width="40" />
                <p className={styles.personName}>
                  {campaign?.master_trust_foundation.trust_name}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <img src={logo} className="h-[30px]" alt="logo" />
                <div className="flex flex-col">
                  <div className={`flex gap-1 ${styles.personName}`}>
                    DoKarma
                    <div>
                      <BadgeCheck size="18" color="green" />
                    </div>
                  </div>
                  <p className={styles.amt}>Fund Facilitator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center">
          <img src={persons} height='28' />
          <p className={styles.creator}>Campaign Creator</p>
        </div>
        <div className="flex my-3">
          <div className={styles.yellowCircle}>
                                <img src={girlAvatar} />
                            </div>
          <RandomAvatar seed="Kingston" width="40" />
          <div
            style={{ width: innerWidth > 991 ? "78%" : "88%" }}
            className="flex flex-wrap justify-between"
          >
            <div className="ms-3 mt-2">
              <p className={styles.personName}>
                {campaign?.master_trust_foundation.trust_name}
              </p>
              <p className={styles.amt}>
                    Mother &nbsp;
                    <span className={styles.blackCircle} />
                    &nbsp; Chennai{" "}
                  </p>
            </div>
            <div className={`flex ${innerWidth < 425 && "mt-3"}`}>
              <img src={logo} className="h-[30px]" />
              <div className="ms-3">
                <div className="flex">
                  <p className={` ${styles.personName}`}>
                    {campaign?.master_trust_foundation.trust_name}
                    DoKarma
                    <sup>
                    &nbsp;
                  </p>
                  <img src={approved} />
                  <BadgeCheck size="18" color="green" />
                  </sup>
                </div>
                <p className={styles.amt}>
                  Fund Facilitator &nbsp;
                  <span className={styles.blackCircle} />
                  &nbsp; Section 8
                </p>
              </div>
            </div>
          </div>
        </div> */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-7 lg:col-span-8 pr-0">
            {/* <div className='mt-3 mb:mt-0 pb-3 flex justify-between'>
                            <p className='text-formColor'>30/09/2024 - 10/10/2024
                                <span className='text-sm text-black opacity-50'> (difference 10 days)</span>
                            </p>
                        </div> */}
            {/* <Dialog>
              <DialogTrigger asChild>
                <div className="inline-block cursor-pointer">
                  <p className="pt-3 flex items-center">
                    <IoFlag />
                    &nbsp;{" "}
                    <span className={styles.support}>Contact support Team</span>
                  </p>
                </div>
              </DialogTrigger>
              <ContactSupport />
            </Dialog> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Donation;

function timeAgo(timestamp: string): string {
  // Convert the input string to a Date object
  const date = new Date(timestamp);
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = now.getTime() - date.getTime();

  // Convert milliseconds to hours
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 1) {
    // If less than 1 hour, calculate minutes
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return diffInMinutes > 1 ? `${diffInMinutes} minutes ago` : "just now";
  } else if (diffInHours < 24) {
    // If less than 24 hours, show in hours
    return `${diffInHours} hours ago`;
  } else {
    // For days
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }
}

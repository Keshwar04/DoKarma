// import { useState } from "react";
import styles from "../../css/newCampaign.module.css";
import { PiggyBank, FilePenLine } from "lucide-react";

const DonationPetition = ({
  title,
  subTxt,
  content,
  campaignDatas,
  handleCampaignType,
}: any) => {
  return (
    <div
      onClick={() => handleCampaignType(title)}
      style={{ marginRight: title === "Petition" ? 0 : undefined }}
      className={`transition-transform duration-200 transform hover:scale-105 cursor-pointer border ${
        campaignDatas.active_campaign === title
          ? "border-formColor"
          : "border-gray-300"
      } ${title === "Petition" ? "m-0" : ""} ${styles.donPetOverall}`}
    >
      <p className="mt-2">{content}</p>
      <div className={styles.bottom}>
        <div
          className="w-[60px] h-[60px] bg-[#EDEDED] rounded-[50%] 
                outline outline-[2px] outline-[#F6F6F6] flex justify-center items-center"
        >
          {title === "Donation" ? (
            <PiggyBank size="30" />
          ) : (
            <FilePenLine size="24" />
          )}
        </div>
        <h3 className="my-2">{title}</h3>
        <p className="mb-2">{subTxt}</p>
      </div>
    </div>
  );
};

export default DonationPetition;

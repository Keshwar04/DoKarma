import styles from "../../css/campaigns.module.css";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Campaign } from "@/types/campaign";

interface props {
  ele: Campaign;
}
const CampaignsCard: React.FC<props> = ({ ele }) => {
  console.log(ele.progress_percentage);

  return (
    <>
      <Card rounded="custom" id="edeed">
        <img
          src={ele.cover_image}
          className="w-[100%] h-[200px] 
                rounded-t-[24px] object-cover"
          alt="cover-image"
        />
        <div className="w-[100%] rounded-b-[24px]">
          <div className="bg-primaryBg p-[18px]">
            <p className={styles.titleTxt}>{ele.category}</p>
            <p className={`${styles.cardTxt2}`}>{ele.campaign_name}</p>
          </div>
          <div className="px-[18px] pb-[18px]">
            <div className="flex items-center gap-x-3 mt-4">
              <p className={styles.projectId}>PROJECT ID</p>
              <p className={styles.projectIdTxt}>{ele?.project_id}</p>
              <Badge
                className={`${
                  ele.status == "Concluded" ? "bg-blue-500" : "bg-green-500"
                }`}
              >
                {ele.status}
              </Badge>
            </div>
            <div className="flex justify-between mt-2">
              <p>
                Received -{" "}
                {ele.progress_percentage
                  ? ele.progress_percentage.toFixed(2)
                  : 0}
                %
              </p>
              <p className="font-bold">
                ₹ {ele.received_amount} / ₹ {ele.target_amount}
              </p>
            </div>
            <Progress
              value={ele.progress_percentage}
              className="w-[100%]"
              outer="primary"
              inner="primary"
              height="h-2.5"
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default CampaignsCard;

import { useEffect, useState } from "react";
import styles from "../../css/campaigns.module.css";
import { Timer, CheckCheck } from "lucide-react";

const CampaignFilter = ({ setCampaigns, cardDatas, total }: any) => {
  const [cardStatus, setCardStatus] = useState("All");
  const [tempCardDatas, setTempCardDatas] = useState<any[]>([]);

  const campaignFilter = [
    { title: "All" },
    { icon: <Timer size="18" />, title: "In Progress" },
    { icon: <CheckCheck size="18" />, title: "Concluded" },
  ];

  const handleClick = (title: string) => {
    setCardStatus(title);
    setCampaigns(
      title === "All"
        ? tempCardDatas
        : tempCardDatas.filter((e: any) => e.status === title)
    );
  };

  useEffect(() => {
    setTempCardDatas(cardDatas);
  }, [cardDatas.length > tempCardDatas.length]);

  return (
    <div className="inline-block sm:block">
      <div className="px-4 py-3 flex flex-col sm:flex-row md:items-center justify-between">
        <p className={styles.compaign}>Your Campaigns ({total})</p>
        <div className="inline-block">
          <div className="flex mt-3 sm:mt-0 shadow border rounded">
            {campaignFilter.map((e: any) => (
              <span
                key={e.title}
                className={`cursor-pointer p-1 px-3 flex items-center 
                        border-r ${
                          cardStatus !== e.title &&
                          "bg-[#F8FAFC] text-[#94A3B8]"
                        }`}
                onClick={() => handleClick(e.title)}
              >
                {e.icon}&nbsp;{e.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignFilter;

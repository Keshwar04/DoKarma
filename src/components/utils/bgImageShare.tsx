import { useFormStore } from "@/store/zustand";
import { ShieldCheck, NotebookText, Share } from "lucide-react";

const BgImageShare = ({
  bgImg,
  view,
  ele = "",
  isSingle,
  isProfile = false,
}: any) => {
  const { setFavData } = useFormStore();
  const isTaxBenefit = ele?.is_tax_benefit;
  const colorCode = ele.is_tax_benefit ? "#FF8C00" : "green";

  return (
    <div
      style={{ backgroundImage: `url("${bgImg}")` }}
      className={`${isSingle && "sm:w-[100%]"}
            ${
              view == "List"
                ? "cursor-pointer rounded-[10px] w-[100px] sm:w-[320px] h-[100px] sm:h-[247px] 2xl:h-[197px]"
                : "w-[100%] rounded-t-[10px]"
            } ${view !== "List" && "h-[177px]"} bg-cover bg-center relative
                `}
      onClick={() => view == "List" && setFavData(ele)}
    >
      {isProfile ? (
        <div
          className="w-[36px] h-[36px] absolute bottom-2 right-2
            bg-white rounded flex justify-center items-center cursor-pointer"
        >
          <Share size="16" />
        </div>
      ) : (
        <div
          className="absolute top-2 right-2 bg-white rounded-[5px]
            flex justify-center items-center p-1"
        >
          {isTaxBenefit ? (
            <NotebookText size="16" color={colorCode} />
          ) : (
            <ShieldCheck size="16" color={colorCode} />
          )}
          <span
            style={{ color: colorCode }}
            className="text-xs text-${statusClr}-500"
          >
            &nbsp;{isTaxBenefit ? "Tax Benefits" : "Verified"}
          </span>
        </div>
      )}
    </div>
  );
};

export default BgImageShare;

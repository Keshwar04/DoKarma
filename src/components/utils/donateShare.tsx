// import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
// import { Dialog, DialogTrigger } from "../ui/dialog";
// import ShareCampaign from "./dialog/shareCampaign";
import { Share } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { staticText } from "@/helper/staticText";
// toggle, setToggle, isDonationShare
const DonateShare = ({ url }: any) => {
  const sqaureCls = `w-[40px] h-[36px] border shadow rounded flex justify-center 
    items-center cursor-pointer hover:bg-[#f2f2f2]`;

  const handleCopy = (url: any) => {
    navigator.clipboard
      .writeText(`${location.origin}/${url}`)
      .then(() =>
        toast({
          title: staticText.textCopied,
          status: "success",
        })
      )
      .catch(() =>
        toast({
          title: staticText.copiedErr,
          status: "error",
        })
      );
  };
  return (
    <>
      {/* {isDonationShare ? (
        <Dialog>
          <DialogTrigger asChild>
            <div className={sqaureCls}>
              <Share size="18" />
            </div>
          </DialogTrigger>
          <ShareCampaign />
        </Dialog>
      ) : (
      )} */}
      <div
        className={sqaureCls}
        onClick={(eve) => {
          eve.stopPropagation();
          handleCopy(url);
        }}
      >
        <Share size="18" />
      </div>

      {/* <div className={sqaureCls}>
        <span onClick={() => setToggle({ ...toggle, fav: !toggle.fav })}>
          {toggle?.fav ? (
            <MdFavorite size="20" color="#fcd34d" />
          ) : (
            <MdFavoriteBorder size="20" />
          )}
        </span>
      </div> */}
    </>
  );
};

export default DonateShare;

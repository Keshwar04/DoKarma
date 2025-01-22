import { Button } from "@/components/ui/button";
import RandomAvatar from "@/components/utils/randomAvatar";
import { getAvatarUrl } from "@/helper/avatar";
import { Database } from "@/types/supabase/database.types";
import Tooltips from "@/components/utils/tooltip";
import { generateRandomString } from "@/helper/randomText";
import { RefreshCcw } from "lucide-react";

interface RandomImageProps {
  handleClick: () => void;
  setCrntImage: (image: string) => void;
  profile: Database["public"]["Tables"]["profiles"]["Row"] | null;
  crntImage: string;
}

const RandomImage = ({
  handleClick,
  setCrntImage,
  profile,
  crntImage,
}: RandomImageProps) => {
  console.log(crntImage);

  return (
    <div className="flex flex-col items-center gap-y-4">
      {profile?.avatar_url ? (
        <div
          className={`w-[140px] h-[140px] rounded-full relative bg-primaryClr
            border-[6px] border-[#FEF3C7] flex justify-center items-center`}
        >
          <img
            src={getAvatarUrl(crntImage, "")}
            alt="Profile"
            className="w-[120px] h-[120px] rounded-full object-cover"
          />
        </div>
      ) : (
        <RandomAvatar seed={profile?.username || "do_karma"} width="140" />
      )}
      <Tooltips
        txt={
          <Button
            size="sm"
            className="bg-[#ededed] hover:bg-[#ededed]"
            onClick={() =>
              setCrntImage(getAvatarUrl(generateRandomString(), ""))
            }
          >
            <RefreshCcw color="black" size="18" />
          </Button>
        }
        hoverTxt="Change Image"
      />
      <Button
        className="bg-pimaryBtn hover:bg-primaryClr text-black mt-5"
        onClick={handleClick}
      >
        Save Profile
      </Button>
    </div>
  );
};

export default RandomImage;

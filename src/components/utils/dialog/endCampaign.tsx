import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const EndCampaign = ({ handleEndCampaign }: any) => {
  const { toast } = useToast();

  const handleNo = () => {
    toast({
      title: "Keep creating your campaign",
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="">
          Are you sure want to End Campaign?
        </DialogTitle>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            type="submit"
            className="bg-[#DC2626] hover:bg-[#B91C1C]"
            onClick={handleEndCampaign}
          >
            Yes
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            type="submit"
            className="bg-formColor hover:bg-[#1F4473]"
            onClick={handleNo}
          >
            No
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default EndCampaign;

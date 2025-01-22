import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { regex } from "@/helper/regex";
import { staticText } from "@/helper/staticText";
import { toast } from "@/hooks/use-toast";
import { createSubscribers } from "@/store/trustSlice";
import { useState } from "react";

const NewsLetter = () => {
  const [mailId, setMailId] = useState("");

  const handleSubscribe = () => {
    if (!mailId) {
      toast({ title: staticText.email, status: "error" });
    } else if (!regex.mail.test(mailId)) {
      toast({ title: staticText.emailErr, status: "error" });
    } else {
      createSubscribers(mailId);
      setMailId("");
    }
  };

  return (
    <div
      className="custom-box-shadow p-5 rounded flex
         flex-col lg:flex-row lg:items-center justify-between gap-y-5"
    >
      <div>
        <p className="text-[20px] md:text-[32px] font-bold">
          See the Change You’re Creating
        </p>
        <p className="text-[15px] text-[#666]">{staticText.sector}</p>
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          placeholder="Enter your Email ID"
          className="md:w-[300px] md:h-[45px]"
          onChange={(e) => setMailId(e.target.value)}
          value={mailId}
        />
        <Button
          size="lg"
          className="bg-pimaryBtn hover:bg-primaryClr text-black text-md"
          onClick={handleSubscribe}
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default NewsLetter;

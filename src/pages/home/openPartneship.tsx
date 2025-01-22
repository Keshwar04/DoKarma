import { ShieldCheck, Users } from "lucide-react";
import { staticText } from "@/helper/staticText";
import { Button } from "@/components/ui/button";
// import dokarmaLogo from "@/assets/home/home-logo-banner.png";
// import { demoUsersImg } from "@/helper/home";
import { getAvatarUrl } from "@/helper/avatar";
import hands from "@/assets/home/footer-hands.jpg";
import { scrollToElement } from "@/helper/elementScroll";
const OpenPartneship = ({ targetRef }: any) => {
  return (
    <div
      className="flex flex-col lg:flex-row items-center my-6 sm:my-12 gap-4 max-w-[1000px] mx-auto"
      id="deddede"
    >
      <div className="flex flex-col gap-y-6">
        <span className="bg-blue-100 uppercase text-[14px] p-2 rounded self-start">
          DoKarma, Donate to Good Karma
        </span>
        <span className="font-bold text-[20px]">Giving is Caring</span>
        <div className="flex items-start gap-2">
          <div className="bg-formColor p-2 rounded">
            <ShieldCheck color="white" size="20" />
          </div>
          <div>
            <p className="font-semibold">Support Verified and Trusted NGOs</p>
            <p>{staticText.community}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="bg-formColor p-2 rounded">
            <Users color="white" size="20" />
          </div>
          <div>
            <p className="font-semibold">Community Driven</p>
            <p>{staticText.crowdFund}</p>
          </div>
        </div>
        <div className="flex">
          {Array.from({ length: 4 }).map((_, index) => (
            <img
              src={getAvatarUrl(index.toString())}
              key={index}
              className="w-8 h-8 rounded-full"
              alt={`avatar${index}`}
            />
          ))}
          <div className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center text-xs">
            1k+
          </div>
        </div>

        <Button
          className="bg-pimaryBtn hover:bg-primaryClr text-black text-md"
          onClick={() => scrollToElement(targetRef)}
        >
          Donate Now
        </Button>
      </div>
      <img
        src={hands}
        alt="dokarma"
        className="w-[400px] h-[300px] sm:h-[355px] rounded mx-auto object-cover"
      />
    </div>
  );
};

export default OpenPartneship;

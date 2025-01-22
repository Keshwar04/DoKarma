import HomeButton from "@/components/utils/homeButton";
import { staticText } from "@/helper/staticText";
// import social from "@/assets/home/social.webp";

import logo from "@/assets/home/grey-logo.png";
import HomeTitle from "@/components/utils/text/homeTitle";
const SocialChange = ({ targetRef }: any) => {
  return (
    <div
      className="bg-[#ffeeaf] pt-3 px-5 sm:px-0 md:ps-8 my-8 flex flex-col md:flex-row
            items-center justify-between overflow-hidden rounded"
    >
      <div className="max-w-[550px]">
        <div className="md:leading-tight">
          <HomeTitle txt={staticText.socialChange} />
        </div>
        <p className="text-[14px] md:text-[20px] text-[#666]">
          {staticText.discover}
        </p>
        <HomeButton
          btn1="Start a Fundraiser"
          btn2="Donate a Fundraiser"
          targetRef={targetRef}
        />
      </div>
      <img
        src={logo}
        className="max-w-[500px] h-[200px] sm:h-auto"
        alt="logo"
      />
    </div>
  );
};

export default SocialChange;

import { staticText } from "@/helper/staticText";
import kids from "@/assets/home/kids.webp";
import { totalCounts } from "@/helper/home";
import HomeButton from "@/components/utils/homeButton";
import DoKarma from "@/components/utils/doKarma";
import HomeTitle from "@/components/utils/text/homeTitle";
const NgoPlatform = () => {
  return (
    <>
      <div
        className="bg-[#ffeeaf] pt-3 px-8 mt-12 mb-8 flex flex-col md:flex-row
            items-center overflow-hidden rounded"
      >
        <div>
          <HomeTitle txt="Raise funds for your cause!" />
          <p className="text-[14px] md:text-[20px] text-[#666]">
            {staticText.initiatives}
          </p>
          <HomeButton
            btn1="Enroll your NGO on give"
            btn2="Raised funds for a listed NGO"
          />
        </div>
        <img src={kids} className="max-w-[500px]" alt="kids" />
      </div>
      <DoKarma />
      <h1 className="text-center text-[24px] md:text-[48px] font-bold leading-tight">
        India’s most trusted online
        <br />
        donation platform
      </h1>
      <div
        className="custom-box-shadow max-w-[880px] mx-auto py-4 px-12
             grid grid-cols-2 md:grid-cols-4 gap-6 my-8 rounded"
      >
        {totalCounts.map((e) => (
          <div key={e.text} className="leading-tight text-center">
            <p className="text-[28px] md:text-[40px] font-bold">{e.count}+</p>
            <p className="text-[14px] text-[#666]">{e.text}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default NgoPlatform;

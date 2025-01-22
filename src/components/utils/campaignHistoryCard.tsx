// import avatarSpecs from '../../assets/avatarSpecs.png'
// import companyIcon from '../../assets/companyIcon.png'
// import avatarWow from "../../assets/avatarWow.png";
import AvatarActive from "./avatarActive";
import { staticText } from "@/helper/staticText";
import { MapPin, LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  //   historyImages,
  numberCircle,
} from "@/helper/profile/campaignsHistoryList";
// import Avatar from "./avatar";
import RandomAvatar from "./randomAvatar";

const campaignHistoryCard = ({ isFav }: any) => {
  const parts = staticText.helpusAbout.split("9.000 signatures");
  return (
    <div className="bg-white border shadow-sm rounded-md px-3 py-5">
      <div className={`${isFav && "h-[455px] overflow-auto scrollbarHide"}`}>
        <div className="flex">
          <AvatarActive />
          <p className="text-cardTitle font-semibold ms-2">
            {staticText.helpus}
          </p>
        </div>
        <p className="text-cardContent my-4 text-[#475467]">
          {parts[0]}
          <span className="font-semibold">9.000 signatures</span>
          {parts[1]}
        </p>
        <div className="flex items-center flex-wrap">
          <div
            className="bg-primaryClr h-[40px] w-[40px] rounded-[50%]
         flex justify-center items-center"
          >
            <RandomAvatar seed="ded" width="40" />
            {/* <img src={avatarWow} className='max-w-[40px]' /> */}
          </div>
          <span className="ms-3 text-[#475467]">Mateus Rodrigues</span>
          <span className="flex items-center ms-3 text-[#475467]">
            <MapPin size="18" />
            &nbsp; São Paulo, Brazil
          </span>
          <Button
            size="sm"
            className="mt-2 bg-pimaryBtn hover:bg-primaryClr text-black ms-auto"
          >
            Sign Campaign
          </Button>
        </div>
        <div className="flex flex-wrap items-center my-4">
          {/* {historyImages.map((e) => (
            <img key={e} src={e} className="" />
          ))} */}
          <span
            className="bg-[#F2F4F7] h-[24px] w-[24px] rounded-[50%] text-[12px]
                flex justtify-center items-center"
          >
            +99
          </span>
          <div className="rounded bg-[#ECFCCB] w-[150px] ms-3">
            <div className="p-[3px] bg-[#84CC16] w-[60%] " />
          </div>
          <span className="text-cardTitle font-semibold ms-auto">
            4.533/9.000
          </span>
        </div>
        <p className="text-cardTitle font-semibold">RoadMap</p>
        <div className="flex">
          {/* <Avatar avatar={avatarSpecs} /> */}
          <div className="ms-3 mb-4">
            <p className="text-[#475467]">
              Mateus Rodrigues
              <span className="text-[#94A3B8] text-cardContent">
                {" "}
                in 20 days
              </span>
            </p>
            <p className="text-[#475467] text-cardContent">
              is gathering
              <span className="text-[#65A30D] font-semibold"> 9000 </span>
              signs to city's prefecture
            </p>
            <p className="text-[#475569] text-cardContent mt-3 w-[85%]">
              {staticText.deliver}
            </p>
          </div>
        </div>
        <div className="flex">
          {/* <Avatar avatar={avatarWow} /> */}
          <div className="ms-3 mb-4">
            <p className="text-[#475467]">
              Mateus Rodrigues
              <span className="text-[#475467] text-cardContent">
                {" "}
                in 20 days
              </span>
            </p>
            <p className="text-[#475467] text-cardContent">
              is raising
              <span className="text-[#65A30D] font-semibold"> 9000 </span>
              to afford their travel costs (2 persons)
            </p>
            <Button
              size="sm"
              className="mt-2 bg-pimaryBtn hover:bg-primaryClr text-black"
            >
              <LoaderCircle size="18" />
              &nbsp; Fund Campaign
            </Button>
          </div>
        </div>
        <div className="flex">
          {/* <Avatar avatar={avatarWow} /> */}
          <div className="ms-3 mb-4">
            <p className="text-[#475467]">
              Mateus Rodrigues
              <span className="text-[#475467] text-cardContent">
                {" "}
                in 20 days
              </span>
            </p>
            <p className="text-[#475467] text-cardContent">
              is raising
              <span className="text-[#65A30D] font-semibold"> 9000 </span>
              to afford their travel costs (2 persons)
            </p>
            <div className="flex">
              {numberCircle.map((e) => (
                <div
                  style={{ background: e.clr }}
                  key={e.num}
                  className={`h-[48px] w-[48px] rounded-[50%]
                        flex justify-center items-center mt-2 mr-2 text-white relative `}
                >
                  {e.num}
                  {/* <img src={companyIcon} className='absolute bottom-0 -right-1' /> */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex">
          {/* <Avatar avatar={avatarWow} isLast={true} /> */}
          <div className="ms-3 mb-4">
            <p className="text-[#475467]">
              Mateus Rodrigues
              <span className="text-[#475467] text-cardContent">
                {" "}
                in 20 days
              </span>
            </p>
            <p className="text-[#475467] text-cardContent">
              is raising
              <span className="text-[#65A30D] font-semibold"> 9000 </span>
              to afford their travel costs (2 persons)
            </p>
            <Button
              size="sm"
              className="mt-2 bg-pimaryBtn hover:bg-primaryClr text-black"
            >
              <LoaderCircle size="18" />
              &nbsp; Get 300 uSDG
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default campaignHistoryCard;

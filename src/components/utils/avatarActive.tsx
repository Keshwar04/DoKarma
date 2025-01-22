import RandomAvatar from "./randomAvatar";

const AvatarActive = () => {
  return (
    <div
      className={`w-[67px] h-[67px] rounded-full relative bg-primaryClr
          border border-[6px] border-[#FEF3C7] flex justify-center items-center`}
    >
      {/* <img src={img} className="max-w-[64px]" /> */}
      <RandomAvatar seed="dede" width="64" bg="" />
      <div
        className="bg-[#12B76A] w-[16px] h-[16px] rounded-[50%] 
            absolute bottom-0 right-[-5px]"
      />
    </div>
  );
};

export default AvatarActive;

import AppLogo from "@/components/utils/appLogo";

const Layout = ({ children, width }: any) => {
  return (
    <div className="flex justify-center h-screen bg-[#f3f3f3]">
      <div className={`flex flex-col w-[${width}] ${width && "px-5"}`}>
        <div className="flex justify-center mt-5 mb-3">
          <AppLogo />
        </div>
        <div
          className={`bg-white shadow border rounded-[6px] p-5
                    ${!width && "w-[340px]"} ${
            width ? "sm:w-[100%]" : "sm:w-[430px]"
          }  `}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

import { Eye } from "lucide-react";
import { RxRocket } from "react-icons/rx";
// import SearchInput from './forms/searchInput'
import { Link } from "react-router-dom";
// import {  useLocation } from "react-router-dom";
// import { MdOutlineCampaign } from "react-icons/md";
const CampaignsSearch = ({ id }: any) => {
  // const location = useLocation(); // Get the current route
  console.log(id);

  // const gepPath = location.pathname == '/campaigns' ? '/campaigns' :
  //   location.pathname == '/all-campaigns' ? '/all-campaigns' : '/';

  const secondaryNavList = [
    { title: "My Campaigns", path: "/donation", icon: <Eye size="20" /> },
    { title: "Support", path: "/support", icon: <RxRocket size="20" /> },
    // { title: 'New Campaign', path: '/new-campaign', icon: <MdOutlineCampaign size='20' /> },
  ];

  return (
    <div className="-mx-4 sm:-mx-9 px-4 sm:px-9 py-3 border-b">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex order-2 order-md-1 items-center justify-between md:justify-start">
          {secondaryNavList.map((e) => (
            <Link to={e.path}>
              <span
                key={e.title}
                className={`flex items-center cursor-pointer me-9
                  ${
                    e.title === "My Campaigns" &&
                    "bg-pimaryBtn p-2 rounded-[6px]"
                  }`}
              >
                {e.icon}&nbsp;{e.title}
              </span>
            </Link>
          ))}
        </div>
        {/* <SearchInput /> */}
      </div>
    </div>
  );
};

export default CampaignsSearch;

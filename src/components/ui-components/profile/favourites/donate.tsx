/**
 * Favourites Component
 *
 * This component displays a user's favorite petitions and donations.
 * It allows switching between grid and list views, and filtering by type (All, Petition, Donation).
 *
 * Features:
 * - Responsive layout using grid system
 * - Dynamic view switching between Grid and List
 * - Filtering options for All Views, Petitions, and Donations
 * - Displays progress for each favorite item
 * - Integrates with campaignHistoryCard for additional details in List view
 *
 * State:
 * - favourites: Array of favorite items to display
 * - types: Object containing current view type and filter selection
 *
 * Key functions:
 * - handleClick: Manages filtering of favorites based on user selection
 * - useEffect: Initializes favorite items with progress data
 */

import { staticText } from "@/helper/staticText";
// import { PiggyBank } from 'lucide-react';//------>>>>>>refer below line
// import { LayoutGrid,FilePenLine, CheckCheck,List } from 'lucide-react';
// import { donateList } from '@/helper/profile/donateList';
import { useEffect, useState } from "react";
import FavouritesCard from "./donateCard";
import Header from "@/components/utils/text/header";
import CampaignHistoryCard from "@/components/utils/campaignHistoryCard";
import { useCampaigns } from "@/hooks/useCampaign";
import { Campaign } from "@/types/campaign";
// import DonatePagination from '../pagination/DonatePagination';

const Favourites = () => {
  // const noOfList = 4;

  const [favourites, setFavourites] = useState<Campaign[]>([]);
  // const [tempFavList, setTempFavList] = useState<any>([])
  // const [startIdx, setStartIdx] = useState(0)
  // const [endIdx, setEndIdx] = useState(noOfList)
  const [types] = useState({ view: "Grid", favourite: "All Views" }); //--->>>refer below line
  // const [types, setTypes] = useState({ view: 'Grid', favourite: 'All Views' })

  // const icons = [<FilePenLine size='18' />, <PiggyBank size='20' />, <PiggyBank size='20' />, <FilePenLine size='18' />,
  // <FilePenLine size='18' />, <PiggyBank size='20' />, <FilePenLine size='18' />, <PiggyBank size='20' />, <PiggyBank size='20' />, <FilePenLine size='18' />
  // ]

  // const icons = Array.from({ length: 10 }, () => (<PiggyBank size='20' />));

  // const mergedFavList = donateList.map((e, i) => ({ ...e, icon: icons[i] }))

  // const viewTypes = [{ icon: <List size='18' />, title: 'List' },
  // { icon: <LayoutGrid size='18' />, title: 'Grid' }]

  // const favouriteTypes = [{ icon: <CheckCheck size='18' />, title: 'All Views' },
  // { icon: <FilePenLine size='18' />, title: 'Petition' },
  // { icon: <PiggyBank size='18' />, title: 'Donation' }]

  // const handleClick = (title: string) => {
  //     setTypes({ ...types, favourite: title })
  //     if (title == 'All Views') {
  //         setFavourites(tempFavList)
  //     } else if (title == 'Petition') {
  //         setFavourites(tempFavList.filter((e: any) => e.icon?.type == FilePenLine))
  //     } else if (title == 'Donation') {
  //         setFavourites(tempFavList.filter((e: any) => e.icon?.type == PiggyBank))
  //     }
  // }
  const { campaigns: campaignsData, loading, error } = useCampaigns();

  useEffect(() => {
    if (campaignsData) {
      setFavourites(campaignsData);
    }
  }, [campaignsData, loading, error]);

  // useEffect(() => {
  //     const updatedProgress = [70, 60, 80, 20, 30, 65, 15, 90, 35, 10];
  //     const finalFavList = mergedFavList.map((e, i) => ({ ...e, progress: updatedProgress[i] }))
  //     // setTempFavList(finalFavList)
  //     const timer = setTimeout(() => setFavourites(finalFavList), 500)
  //     return () => clearTimeout(timer)
  // }, [])

  return (
    <div className="py-3">
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-5">
          <div className="flex items-center flex-wrap gap-x-10 gap-y-3">
            <div className="">
              <Header txt="Donate" />
              <p className="text-subHeader text-[#475467]">
                {staticText.favSub}
              </p>
            </div>
          </div>
        </div>
        {/* <div className='col-span-12 lg:col-span-7 flex flex-col sm:flex-row
         sm:items-center justify-between lg:justify-end sm:gap-6'>
                    <div className='inline-block'>
                        <div className='inline-flex mt-3 sm:mt-0 shadow border rounded'>
                            {favouriteTypes.map(e => (
                                <span key={e.title} className={`cursor-pointer p-1 px-3 flex items-center 
                 border-r ${types.favourite !== e.title && 'bg-[#F8FAFC] text-[#94A3B8]'}`}
                                    onClick={() => handleClick(e.title)}>
                                    {e.icon}&nbsp;{e.title}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-center'>
                        <div className='shadow border rounded flex self-start sm:self-auto mt-3 sm:mt-0'>
                            {viewTypes.map(e => (
                                <span key={e.title} className={`cursor-pointer p-1 px-3 flex items-center 
                 border-r ${types.view !== e.title && 'bg-[#F8FAFC] text-[#94A3B8]'}`}
                                    onClick={() => setTypes({ ...types, view: e.title })}>
                                    {e.icon}&nbsp;{e.title}
                                </span>
                            ))}
                        </div>
                    </div>
                </div> */}
      </div>
      <div className="grid grid-cols-12 my-8 gap-x-[25px]">
        <div
          className={`col-span-12 sm:col-span-${types.view == "List" && 12}
         lg:col-span-${types.view == "List" && 7}`}
        >
          <div
            className={`${
              types.view === "List" && "h-[500px] overflow-auto scrollbarHide"
            }`}
          >
            <div className="grid grid-cols-12 gap-[25px]">
              {favourites.map((e: any, idx: number) => (
                <div
                  key={idx}
                  className={`col-span-12 ${
                    types.view != "List" && "sm:col-span-6"
                  } 
          ${types.view != "List" && " lg:col-span-4"} `}
                >
                  <FavouritesCard types={types} ele={e} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`${
            types.view === "List" ? "visible" : "hidden"
          } col-span-12 
         sm:col-span-12 lg:col-span-5`}
        >
          <div className="h-[500px] overflow-auto scrollbarHide">
            <CampaignHistoryCard isFav={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;

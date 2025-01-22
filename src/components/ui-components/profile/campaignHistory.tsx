/**
 * Notification Component
 * 
 * This component displays various notifications and updates for the user.
 * It includes:
 * - A header with filtering options for different types of notifications
 * - Multiple notification items showing user activities, funding updates, and rewards
 * - Avatar images for each notification
 * - Action buttons for funding campaigns and claiming rewards
 * - A pagination component for navigating through notifications
 * - A featured card displaying a campaign with an image background
 * 
 * The component uses various UI elements from the project's component library,
 * such as Header, Avatar, Button, and Paginations.
 * 
 * It also incorporates icons from lucide-react and react-icons libraries.
 */

import { PiggyBank, FilePenLine, LoaderCircle } from 'lucide-react';
import avatarSpecs from '../../../assets/avatarSpecs.png'
import avatarWow from '../../../assets/avatarWow.png'
import avatarOoo from '../../../assets/avatarOoo.png'
import babyMom from '../../../assets/babyMom.png'
import { PiCurrencyEthDuotone } from "react-icons/pi";
import { staticText } from '@/helper/staticText';
import { Button } from '@/components/ui/button';
import Paginations from '@/components/shadUI/pagination';
import { useEffect } from 'react';
import { useMenuStore } from '@/store/zustand';
import Header from '@/components/utils/text/header';
import Avatar from '@/components/utils/avatar';
import CampaignHistoryCard from '@/components/utils/campaignHistoryCard';

const Notification = () => {
    const { setProfileMenu } = useMenuStore()
    useEffect(() => setProfileMenu('Notifications'), [])

    return (
        <div className='px-4 sm:px-9'>
            <div className='grid grid-cols-12 mb-5'>
                <div className='col-span-12 md:col-span-6 pr-0 sm:pr-5'>
                    <div className='flex flex-col xl:flex-row xl:justify-between mt-7'>
                        <Header txt='Notification' />
                        <div className='shadow inline-block border rounded-md flex self-start mt-3 sm:mt-2'>
                            <span className='cursor-pointer p-1 px-3 border-r flex  items-center'>
                                All views
                            </span>
                            <span className='cursor-pointer p-1 px-3 border-r flex  items-center'>
                                <PiggyBank size='18' />&nbsp;Funding
                            </span>
                            <span className='cursor-pointer p-1 px-3 flex items-center bg-[#F8FAFC] text-[#94A3B8]'>
                                <FilePenLine size='18' />&nbsp;Signatures
                            </span>
                        </div>
                    </div>
                    <div className='flex mt-5'>
                        <Avatar avatar={avatarSpecs} />
                        <div className='ms-3 flex-grow'>
                            <div className='flex justify-between'>
                                <p className='text-[#475467]'>Mateus Rodrigues
                                    <span className='text-[#94A3B8] text-cardContent'> in 20 days</span>
                                </p>
                                <div className='bg-[#12B76A] w-[8px] h-[8px] rounded-[50%]' />
                            </div>
                            <p className='text-[#475467] text-cardContent'>is gathering
                                <span className='text-[#65A30D] font-semibold'> 9000 </span>
                                signs to city's prefecture</p>
                            <p className='text-[#475569] text-cardContent mt-3 w-[85%]'>{staticText.deliver}</p>
                        </div>
                    </div>
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div className='flex' key={i}>
                            <Avatar avatar={avatarWow} />
                            <div className='ms-3 mb-4 flex-grow'>
                                <div className='flex justify-between'>
                                    <p className='text-[#475467]'>Mateus Rodrigues
                                        <span className='text-[#94A3B8] text-cardContent'> in 20 days</span>
                                    </p>
                                    <div className='bg-[#12B76A] w-[8px] h-[8px] rounded-[50%]' />
                                </div>
                                <p className='text-[#475467] text-cardContent'>is raising
                                    <span className='text-[#65A30D] font-semibold'> 9000 </span>
                                    to afford  their travel costs (2 persons)
                                </p>
                                <Button size='sm' className='mt-2 bg-pimaryBtn hover:bg-primaryClr text-black'>
                                    Fund Campaign
                                </Button>
                            </div>
                        </div>
                    ))}
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div className='flex' key={i}>
                            <Avatar avatar={avatarWow} />
                            <div className='ms-3 mb-4'>
                                <p className='text-[#475467]'>Mateus Rodrigues
                                    <span className='text-[#475467] text-cardContent'> 2 mins ago</span>
                                </p>
                                <p className='text-[#475467] text-cardContent'>Your
                                    <span className='text-[#9333EA] font-semibold'> 300 </span>
                                    uSDG+ <span className='text-[#9333EA] font-semibold'> 10,000 </span>
                                    XP will be available in 3 days
                                </p>
                                <Button size='sm' className='mt-2 bg-pimaryBtn hover:bg-primaryClr text-black'>
                                    <LoaderCircle size='18' />&nbsp; Get 300 uSDG
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className='flex'>
                        <Avatar avatar={avatarOoo} isLast={true} />
                        <div className='ms-3'>
                            <p className='text-[#475467]'>Mateus Rodrigues
                                <span className='text-[#475467] text-cardContent'> 2 mins ago</span>
                            </p>
                            <p className='text-[#475467] text-cardContent'>Your
                                <span className='text-[#9333EA] font-semibold'> 300 </span>
                                uSDG+ <span className='text-[#9333EA] font-semibold'> 10,000 </span>
                                XP will be available in 3 days
                            </p>
                            <Button size='sm' className='mt-2 bg-pimaryBtn hover:bg-primaryClr text-black'>
                                <PiCurrencyEthDuotone size='18' />&nbsp; Get 300 uSDG
                            </Button>
                        </div>
                    </div>
                    <Paginations />
                </div>
                <div className='col-span-12 md:col-span-6'>
                    <div style={{ backgroundImage: `url(${babyMom})` }}
                        className='bg-cover p-5 sm:py-10 flex items-center'>
                        <CampaignHistoryCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification

import PaginationTable from "@/components/utils/table/paginationTable";
import { campaignDonation, tableDatas, tableHeaders } from "@/helper/helper"
import { MoveDownRight, MoveUpRight } from 'lucide-react';

const SuperDashoard = () => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6'>
                {campaignDonation.map(e => (
                    <div className='border rounded py-3 px-4 shadow-sm'>
                        <p className='text-[#868E96] text-[13px] uppercase'>{e.title}</p>
                        <p className='font-bold text-[20px] md:text-[28px] flex items-center mt-2'>
                            {e.amt}
                            <span className={`text-[14px] flex items-center
                            ${e.status == 'high' ? 'text-[#12B886]' : 'text-[#fa5252]'}`}>
                                &nbsp; {e.perc}
                                {e.status == 'high' ?
                                    <MoveUpRight size='14' /> : <MoveDownRight size='14' />}
                            </span>
                        </p>
                        <p className='text-[#868E96] text-[13px]'>{e.compare}</p>
                    </div>
                ))}
            </div>
            <div className="border rounded mt-10">
                <PaginationTable headers={tableHeaders} datas={tableDatas} />
            </div>
        </>
    )
}

export default SuperDashoard

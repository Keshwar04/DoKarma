/**
 * Support component for DoKarma
 * Renders the CampaignsSearch component and a placeholder text
 * TODO: Implement full support page functionality
 */

import CampaignsSearch from '../components/utils/campaignsSearch'

const Support = () => {
    return (
        <>
            <CampaignsSearch />
            <p className='font-bold mt-5 text-center'>Support Page</p>
        </>
    )
}

export default Support

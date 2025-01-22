import {DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const CampaignCreator = () => {
    const creator = [
        { label: 'Name', data: 'Vidhya RajKumar' },
        { label: 'Mobile Number', data: '+918807379177' },
        { label: 'Email Id', data: 'vidhyaraj@gmail.com' },
        { label: 'Location', data: 'Chennai' },
    ]
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Campaign Creator Details</DialogTitle>
            </DialogHeader>
           <div className="py-2">
           {creator.map(e => (
                < div key={e.label} className='flex items-center mb-3'>
                    <Label htmlFor="name" className='w-[40%] text-formColor'>
                        {e.label}
                    </Label>
                    <p className=''>{e.data}</p>
                </div>
            ))}
           </div>
            {/* <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter> */}
        </DialogContent >
    )
}

export default CampaignCreator

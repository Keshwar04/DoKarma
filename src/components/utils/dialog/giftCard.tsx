import { Button } from "@/components/ui/button"
import {
    DialogContent, DialogFooter,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"


const GiftCard = () => {
    const [giftCardCode, setGiftCardCode] = useState('')
    return (
        <DialogContent className="sm:max-w-[425px] p-10">
            <DialogHeader className="mb-3">
                <DialogTitle>Reedem your Gift Card</DialogTitle>
            </DialogHeader>
            <Label htmlFor="name">
                Gift Card Code
            </Label>
            <Input placeholder="Enter your Gift Card Code" className="-mt-1"
                onChange={e => setGiftCardCode(e.target.value)} value={giftCardCode} />
            <DialogFooter className="mt-5">
                <Button type="submit" className="bg-pimaryBtn hover:bg-primaryClr 
      text-black text-md font-medium">
                    Redeem Code
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default GiftCard

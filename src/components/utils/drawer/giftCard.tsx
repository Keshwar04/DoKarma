import { Button } from "@/components/ui/button"
import {
    DrawerClose, DrawerContent, DrawerDescription,
    DrawerFooter, DrawerHeader, DrawerTitle,
} from "@/components/ui/drawer"

const GiftCard = () => {
    return (
        <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                    <DrawerTitle>Move Goal</DrawerTitle>
                    <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </div>
        </DrawerContent>
    )
}

export default GiftCard

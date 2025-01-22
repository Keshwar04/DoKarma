import {
    Tooltip, TooltipContent,
    TooltipProvider, TooltipTrigger
} from "@/components/ui/tooltip"

const Tooltips = ({ hoverTxt, txt }: any) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{txt}</TooltipTrigger>
                <TooltipContent>
                    {hoverTxt}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default Tooltips

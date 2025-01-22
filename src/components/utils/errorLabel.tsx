import { Label } from "@/components/ui/label"
const ErrorLabel = ({ errData}: any) => {
    return (
        <Label className={`${errData ? 'visible' : 'invisible'} text-[12px] text-red-500 mt-1`}>
            {errData || 'ded'}
        </Label>
    )
}

export default ErrorLabel

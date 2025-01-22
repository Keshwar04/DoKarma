import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
const RadioInput = ({ handleChange, genderValue, radioList, flexCol }: any) => {
    return (
        <RadioGroup className={`flex ${flexCol}`} value={genderValue}
            onValueChange={handleChange}>
            {radioList?.map((e: any) => (
                <div key={e.value} className='flex items-center space-x-2'>
                    <RadioGroupItem value={e.value} id={e.id} />
                    <Label htmlFor={e.id}>{e.value}</Label>
                </div>
            ))}
        </RadioGroup>
    )
}

export default RadioInput

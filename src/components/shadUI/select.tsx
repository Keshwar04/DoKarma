import {
    Select, SelectContent, SelectGroup,
    SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

const SelectUI = ({ txt, handleChange,locationValue }: any) => {
    return (
        <Select value={locationValue} onValueChange={e => handleChange(e, 'select')}>
            <SelectTrigger>
                <SelectValue placeholder={txt} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {/* <SelectLabel>Fruits</SelectLabel> */}
                    <SelectItem value="Chennai, TamilNadu">Chennai, TamilNadu</SelectItem>
                    <SelectItem value="Salem, TamilNadu">Salem, TamilNadu</SelectItem>
                    <SelectItem value="Trichy, TamilNadu">Trichy, TamilNadu</SelectItem>
                    <SelectItem value="Coimbatore, TamilNadu">Coimbatore, TamilNadu</SelectItem>
                    <SelectItem value="Theni">Theni, TamilNadu</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectUI

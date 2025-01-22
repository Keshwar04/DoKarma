import {
    Select, SelectContent, SelectGroup,
    SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

const SelectInput = ({ selectList, text, isCode, isDisable }: any) => {
    return (
        <Select >
            <SelectTrigger disabled={isDisable}
                defaultValue={isDisable && selectList[0]?.value}>
                <SelectValue placeholder={isDisable ? selectList[0]?.value : text} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {selectList.map((e: any) => (
                        <SelectItem key={e.value} value={e.value}>{e.value}
                            {isCode && <span className="opacity-50">&nbsp; {e.code}</span>}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectInput

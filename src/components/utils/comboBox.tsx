import { useEffect, useState, useRef } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ComboBox = ({
  selectList,
  placeholder,
  setState,
  stateKey,
  isDisabled,
  isDefaultValue,
}: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(isDefaultValue || "");
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setState && setState({ [stateKey]: value });
  }, [value]);

  useEffect(() => {
    setValue(isDefaultValue || "");
  }, [isDefaultValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={isDefaultValue || isDisabled}
          ref={btnRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {value
            ? selectList.find((e: any) => e.value === value)?.label
            : `Select ${placeholder}`}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{
          width: btnRef.current ? btnRef.current.offsetWidth : undefined,
        }}
      >
        <Command>
          <CommandInput placeholder={`Search ${placeholder}`} className="h-9" />
          <CommandList>
            <CommandEmpty>No {placeholder} found.</CommandEmpty>
            <CommandGroup>
              {selectList.map((e: any) => (
                <CommandItem
                  key={e.value}
                  value={e.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {e.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === e.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;

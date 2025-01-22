import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const DatePickerUI = ({ handleDateChange, stateValue, isDisabled }: any) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={isDisabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !stateValue && "text-muted-foreground",
            isDisabled && "cursor-not-allowed"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {stateValue ? format(stateValue, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={stateValue}
          onSelect={handleDateChange}
          disabled={isDisabled}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerUI;

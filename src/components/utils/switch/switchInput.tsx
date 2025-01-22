import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SwitchInput = ({
  label,
  handleChange,
  id,
  isDisabled,
  defaultValue,
}: any) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        onCheckedChange={(e) => handleChange(e, id)}
        className="mt-2"
        disabled={isDisabled}
        checked={defaultValue}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};

export default SwitchInput;

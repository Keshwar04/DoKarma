import { Checkbox } from "@/components/ui/checkbox";
import { staticText } from "@/helper/staticText";
import { Link } from "react-router-dom";

const CheckBoxInput = ({
  text,
  handleCheckBox,
  id,
  isDefaultChecked,
  stateValue,
  isDisabled,
}: any) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        onCheckedChange={handleCheckBox}
        defaultChecked={isDefaultChecked}
        value={stateValue}
        disabled={isDisabled}
      />
      <label
        htmlFor={id}
        className={`${
          text === staticText.whatsappUpdate
            ? "text-[12px] sm:text-sm"
            : "text-sm"
        } font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
      >
        {text}
        {id == "terms_and_conditions" && (
          <Link
            to="/terms-and-conditions"
            className="text-formColor cursor-pointer"
          >
            &nbsp;Terms and Conditions
          </Link>
        )}
      </label>
    </div>
  );
};

export default CheckBoxInput;

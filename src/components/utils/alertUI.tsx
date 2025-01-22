import { CircleCheckBig } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
const AlertUI = ({ title, description }: any) => {
  return (
    <Alert className="bg-yellow-500 text-white flex flex-col sm:flex-row justify-center items-center gap-x-3 mb-5">
      <AlertTitle className="flex items-center text-[15px] sm:text-[16px]">
        {title}
        &nbsp;
        <CircleCheckBig color="white" className="h-4 w-4" />
      </AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertUI;

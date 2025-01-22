import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/authStore";
import { scrollToElement } from "@/helper/elementScroll";

const HomeButton = ({ btn1, btn2, targetRef }: any) => {
  const { user } = useAuthStore();

  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row my-8 gap-5">
      {!user?.id && (
        <Button
          className="bg-formColor hover:bg-[#1F4473] text-md"
          onClick={() => navigate("/login")}
        >
          {btn1}
        </Button>
      )}

      <Button
        variant="outline"
        className="text-md"
        onClick={() => scrollToElement(targetRef)}
      >
        {btn2}
      </Button>
    </div>
  );
};

export default HomeButton;

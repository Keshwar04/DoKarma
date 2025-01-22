import { useNavigate } from "react-router-dom";
import logo from "../../../src/assets/logo.png";
import DoKarma from "./doKarma";

const AppLogo = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img src={logo} alt="do-karma" />
      <DoKarma />
    </div>
  );
};

export default AppLogo;

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProgressCircle from "@/components/utils/progressCircle";
import HomeTitle from "@/components/utils/text/homeTitle";
import { monthlyDonate } from "@/helper/home";
import { staticText } from "@/helper/staticText";
import { ShieldCheck, NotebookText } from "lucide-react";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MonthlySupport = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mt-12">
        <HomeTitle txt="Sustained Giving, Meaningful Results" />
      </div>
      <p className="md:text-[20px] text-[#666] mb-8">{staticText.sustained}</p>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {monthlyDonate.map((e: any) => (
          <div
            key={e.title}
            className="transition-transform duration-200 transform 
                hover:scale-105 cursor-pointer group"
            onClick={() =>
              navigate(`support-causes/${e.title.replace(/\s+/g, "-")}`)
            }
          >
            <Card fav="Grid">
              <div
                style={{ backgroundImage: `url(${e.img})` }}
                className="w-full h-[332px] rounded-lg relative bg-cover bg-center"
              >
                <div
                  className="absolute left-0 bottom-0 text-white bg-black
                             bg-opacity-50 ps-4 w-full"
                >
                  <p className="text-[24px] font-bold">{e.title}</p>
                </div>
                <div
                  className="absolute top-2 right-2 bg-white rounded-[5px]
            flex justify-center items-center p-1"
                >
                  {e.status == "Verified" ? (
                    <ShieldCheck size="16" color="green" />
                  ) : (
                    <NotebookText size="16" color="#FF8C00" />
                  )}
                  <span
                    style={{
                      color: e.status == "Verified" ? "green" : "#FF8C00",
                    }}
                    className="text-xs text-${statusClr}-500"
                  >
                    &nbsp;{e.status}
                  </span>
                </div>
              </div>
              <div className="group-hover:hidden flex p-3 items-center gap-3">
                <ProgressCircle percentage={e.progress} />
                <div>
                  <div>
                    <span className="text-formColor">{e.supports}</span>
                    <span>&nbsp;{e.subTxt}</span>
                  </div>
                  <div className="flex items-center">
                    <Users size="18" color="gray" />
                    <span className="text-[#444] text-sm">
                      &nbsp; {e.donations} Donors
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-3 hidden group-hover:block">
                <Button
                  id="btn"
                  className="bg-pimaryBtn hover:bg-primaryClr text-black 
                            w-full text-md"
                  onClick={(eve) => {
                    eve.stopPropagation();
                    navigate(
                      `support-causes/donate/${e.title.replace(/\s+/g, "-")}`
                    );
                  }}
                >
                  Donate Now
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlySupport;

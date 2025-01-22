import { useNavigate, useParams } from "react-router-dom";
import { pledgeContents } from "@/helper/pledgeContent";
import BoldText from "@/components/utils/boldText";
import { Button } from "@/components/ui/button";
const PledgeMonthly = () => {
  const { id } = useParams();
  const title = id?.replace(/-/g, " ");
  const navigate = useNavigate();
  const supportCauses = pledgeContents.filter(
    (e) => e.verifyTitle === title
  )[0];

  return (
    <div className="py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={supportCauses.img}
            alt="People affected by hunger in India"
            className="w-full h-[300px] sm:h-[726px] object-cover"
          />
        </div>
        <div className="space-y-8 sm:p-5">
          <div className="sm:w-[300px] mx-auto">
            <Button
              className="bg-pimaryBtn hover:bg-primaryClr text-black 
            text-md w-full"
              onClick={() => navigate(`/support-causes/donate/${id}`)}
            >
              Donate Now
            </Button>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
            {supportCauses.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            <BoldText
              text={supportCauses.content}
              highlights={[supportCauses.contentBold]}
            />
          </p>
          <div className="space-y-6">
            <div className="bg-blue-100 px-4 py-2 rounded-lg inline-block">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {supportCauses.subHeader}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <ul className="list-disc pl-4 mt-2 space-y-2">
                  <li className="text-xl font-semibold text-gray-900">
                    {supportCauses.point1}
                  </li>
                  <li className="text-xl font-semibold text-gray-900">
                    {supportCauses.point2}
                  </li>
                  <li className="text-xl font-semibold text-gray-900">
                    {supportCauses.point3}
                  </li>
                  {supportCauses.point4 && (
                    <li className="text-xl font-semibold text-gray-900">
                      {supportCauses.point4}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed mt-8">
            <BoldText
              text={supportCauses.description}
              highlights={[supportCauses.descriptionBold]}
            />
          </p>
        </div>
      </div>

      {/* <div className="grid lg:grid-cols-2 gap-12 items-center  py-16 ">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl xl:text-6xl">
            Join DoKarma in the fight against hunger across India
          </h1>
        </div>
        <div className="space-y-8">
          <p className="text-lg text-gray-600 leading-relaxed">
            Support our NGOs in providing midday meals to school children across
            several states and packaged meals fortified with micronutrients and
            minerals to impoverished elders
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              OUR PARTNER NGOs
            </h2>
            <div className="grid grid-cols-2 gap-8 bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-center">
                <img
                  src={partner1}
                  alt="Annamrita Logo"
                  className="h-16 object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={partner2}
                  alt="Rise Against Hunger Logo"
                  className="h-16 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl xl:text-6xl mb-6">
          Support meals programmes to help those who have little to eat
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Your regular donation will save the underprivileged, especially
          children, from the pain of hunger, malnourishment and chronic illness.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
        <div className="rounded-lg">
          <img
            src={support1}
            alt="Annamrita Logo"
            className="object-contain rounded-lg"
          />
        </div>
        <div className=" rounded-lg">
          <img
            src={support2}
            alt="Annamrita Logo"
            className="object-contain rounded-lg"
          />
        </div>
      </div> */}
    </div>
  );
};

export default PledgeMonthly;

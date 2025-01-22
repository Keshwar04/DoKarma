import { Card, CardContent, CardDescription } from "@/components/ui/card";
// import { blogs } from "@/helper/home";
import { useNavigate, useParams } from "react-router-dom";
// import img1 from "@/assets/home/blogs/blogDetails/img1-crop.jpg";
// import img1 from "@/assets/home/blogs/Karthigai-Deepam24-blog.jpg";
// import kid from "@/assets/home/blogs/blogDetails/catogeries/kid.png";
import LineBreakText from "@/components/utils/lineBreakText";
import { Button } from "@/components/ui/button";
import { blogs } from "@/helper/home";
import BoldText from "@/components/utils/boldText";
import { staticText } from "@/helper/staticText";
const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numberId = Number(id) - 1;
  const isDeepam = blogs[numberId].category === "deepam";
  const boldedText1 = isDeepam ? ["Karthigai Deepam"] : ["Arunachala Hill"];
  const boldedText2 = isDeepam
    ? [
        "Karthigai",
        "Pournami",
        "Thiruvannamalai",
        "Arunachala Hill",
        "Maha Deepam",
      ]
    : ["Girivalam", "Arunachaleswarar Temple"];
  return (
    <div className="py-10">
      <Card>
        <img
          src={blogs[numberId].innerImg}
          className="rounded w-[100%] h-[325px] object-cover"
          alt="blogs"
        />
        <div className="px-3 md:px-7 lg:px-28 xl:px-60 py-9 flex flex-col gap-7">
          <CardDescription className="font-bold text-[16px]">
            {blogs[numberId].date}
          </CardDescription>
          <h1 className="text-[30px] md:text-[45px] leading-tight font-bold">
            {blogs[numberId].page?.title1}
          </h1>
          <CardContent className="p-0 text-[20px] text-[#444]">
            <BoldText
              text={blogs[numberId].page?.text1}
              highlights={boldedText1}
            />
            {/* <LineBreakText text={staticText.supportingTxt} /> */}
          </CardContent>
          <h1 className="text-[27px] md:text-[32px] leading-tight font-bold">
            {blogs[numberId].page?.title2}
          </h1>
          <CardContent className="p-0 text-[20px] text-[#444]">
            <BoldText
              text={blogs[numberId].page?.text2}
              highlights={boldedText2}
            />
            {/* <LineBreakText text={blogs[numberId].page?.text2} /> */}
          </CardContent>
          <h1 className="text-[27px] md:text-[32px] leading-tight font-bold">
            {blogs[numberId].page?.title3}
          </h1>
          <CardContent className="p-0 text-[20px] text-[#444]">
            <LineBreakText text={blogs[numberId].page?.text3} />
          </CardContent>
          {/* <img src={kid} className="rounded w-[100%]" /> */}
        </div>
        <div
          className="custom-box-shadow p-5 mt-0 m-4 sm:m-12 rounded flex
         flex-col lg:flex-row lg:items-center justify-between gap-y-5"
        >
          <div>
            <p className="text-[24px] md:text-[32px] font-bold">
              Make a Difference
            </p>
            <p className="text-[#666] text-[18px]">
              {staticText.positiveImpact}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Button
              size="lg"
              className="bg-pimaryBtn hover:bg-primaryClr 
                            text-black text-md"
              onClick={() => {
                navigate("/", {
                  state: { scrollTo: "campaigns", from: "blogs" },
                });
              }}
            >
              Donate Karma
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlogDetails;

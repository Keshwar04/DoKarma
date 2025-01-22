import BlogCarousel from "@/components/utils/carousel/blogCarousel";
// import LineBreakText from "@/components/utils/lineBreakText";
// import { blogs, blogSettings } from "@/helper/home";
// import { staticText } from "@/helper/staticText";
// import Slider from "react-slick";
// import { Card } from "@/components/ui/card"
const Blogs = () => {
  return (
    <div
      className="bg-[#faf9f9] p-4 sm:p-8 flex flex-col lg:flex-row 
        lg:items-center justify-between -mx-4 sm:-mx-9 my-10"
    >
      <div className="flex flex-col gap-3 items-start">
        <p className="text-[26px] md:text-[35px] leading-tight font-bold">
          Stay Informed, Make a Difference
          {/* See the Change You’re Creating */}
        </p>
        {/* <div className="md:text-[20px] text-[#666]">
          <p className="hidden lg:block leading-[0.7]">
            <LineBreakText text={staticText.sector} />
          </p>
          <p className="block lg:hidden">{staticText.sector}</p>
        </div> */}
      </div>
      <div className="blog-carousels mt-5 lg:mt-0">
        {/* <div className="slider-container">
                    <Slider {...blogSettings}>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                        <div>
                            <h3>5</h3>
                        </div>
                        <div>
                            <h3>6</h3>
                        </div>
                    </Slider>
                </div> */}
        <BlogCarousel />
      </div>
    </div>
  );
};

export default Blogs;

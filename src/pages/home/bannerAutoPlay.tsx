import { bannerImages, settings } from "@/helper/home";
import Slider from "react-slick";

const BannerAutoPlay = () => {
  return (
    <div className="slider-container mt-[35px] mb-12 px-5 sm:px-0">
      <Slider {...settings}>
        {bannerImages.map((item, index) => (
          <div key={index}>
            <img
              src={item.img}
              className="rounded-2xl w-[100%]"
              alt={item.altImgName}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerAutoPlay;

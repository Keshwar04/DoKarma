import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { blogs } from "@/helper/home";
import { useNavigate } from "react-router-dom";

const BlogCarousel = () => {
  const navigate = useNavigate();
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1, // Change to 1 for better mobile experience
      breakpoints: {
        "(min-width: 640px)": { slidesToScroll: 2 },
      },
    },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  );

  return (
    <>
      <div ref={emblaRef} className="w-full max-w-2xl overflow-hidden">
        <div className="flex gap-x-5 flex-nowrap">
          {blogs.map((e, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex-grow-0 basis-auto sm:basis-1/2
                      cursor-pointer rounded-md bg-white transition-transform duration-200 transform
                      hover:scale-105 shadow-lg"
              onClick={() => navigate(`/blogs/${e.id}`)}
            >
              <img
                src={e.img}
                alt={e.title}
                className="w-full h-[208px] rounded-t-md object-cover"
              />
              <h2
                title={e.title}
                className="text-[20px] line-clamp-2 px-3 pt-2 font-semibold"
              >
                {e.title}
              </h2>
              <p className="px-3 py-3">{e.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogCarousel;

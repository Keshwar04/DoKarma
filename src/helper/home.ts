// import banner1 from "@/assets/home/banner1.webp";
// import banner2 from "@/assets/home/banner2.webp";
// import banner3 from "@/assets/home/banner3.webp";
// import banner4 from "@/assets/home/banner4.webp";

import banner1 from "@/assets/home/home-banner/1.png";
import banner2 from "@/assets/home/home-banner/2.png";
import banner3 from "@/assets/home/home-banner/3.png";
import banner4 from "@/assets/home/home-banner/4.png";
// import sustained1 from "@/assets/home/montly/child.webp";
// import sustained2 from "@/assets/home/montly/girl.webp";
// import sustained3 from "@/assets/home/montly/grandpa.webp";

import sustained1 from "@/assets/home/monthly1/m1-MAD.jpg";
import sustained2 from "@/assets/home/monthly1/temple.jpg";
import sustained3 from "@/assets/home/monthly1/m3-orphans.jpg";

// import aanandham from '@/assets/home/'

// blogs
// import img1 from "@/assets/home/blogs/img1.webp";
// import img2 from "@/assets/home/blogs/img2.webp";
import img1 from "@/assets/home/blogCarousel/Karthigai-Deepam24-blog.jpg";
import img2 from "@/assets/home/blogCarousel/Thiruvannamalai-blog-2.jpg";
import deepam from "@/assets/home/blogs/blogDetails/deepam.jpg";
import malai from "@/assets/home/blogs/blogDetails/shiva.jpg";
import { staticText } from "./staticText";
// import img3 from "@/assets/home/blogs/img3.webp";
// import img4 from "@/assets/home/blogs/img4.webp";
// import img5 from "@/assets/home/blogs/img5.webp";
// import img6 from "@/assets/home/blogs/img6.webp";

export const blogs = [
  {
    id: 1,
    img: img1,
    category: "deepam",
    title: "Karthigai Deepam: Illuminating Lives with Light, Faith, and Unity",
    date: "2 December 2024",
    page: {
      title1: staticText.deepam.title1,
      title2: staticText.deepam.title2,
      title3: staticText.deepam.title3,
      text1: staticText.deepam.text1,
      text2: staticText.deepam.text2,
      text3: staticText.deepam.text3,
    },
    innerImg: deepam,
  },
  {
    id: 2,
    img: img2,
    category: "malai",
    title: "Thiruvannamalai and Your Spiritual Connection",
    date: "6 November 2024",
    page: {
      title1: staticText.malai.title1,
      title2: staticText.malai.title2,
      title3: staticText.malai.title3,
      text1: staticText.malai.text1,
      text2: staticText.malai.text2,
      text3: staticText.malai.text3,
    },
    innerImg: malai,
  },
  // {
  //     img: img3,
  //     title: 'Your monthky donation can help children & elders in need',
  //     date: '17 April 2024'
  // },
  // {
  //     img: img4,
  //     title: '10 FAQs on tax savings and 80G deductions for donations',
  //     date: '24 Febraury 2024'
  // },
  // {
  //     img: img5,
  //     title: `Make a bithday donation to an NGO in your loved one's name`,
  //     date: '13 July 2024'
  // },
  // {
  //     img: img6,
  //     title: '10 cancer care NGOs in India helping the poor',
  //     date: '9 August 2024'
  // },
];
export const monthlyDonate = [
  {
    img: sustained1,
    title: "Education For Everyone",
    progress: 46,
    donations: 308,
    supports: 1120,
    status: "Tax Benefits",
    subTxt: "Children needs support",
    id: "496290cb-001a-443b-ad7f-f6c6876f807b",
  },
  {
    img: sustained2,
    title: "Stop Temple Ruins",
    progress: 59,
    supports: "5k",
    donations: "1k+",
    status: "Verified",
    subTxt: "Temples Needs Maintenance",
    id: "5e64a22c-dbdf-4c08-91d8-69684490fc72",
  },
  {
    img: sustained3,
    title: "Support Against Hunger",
    progress: 64,
    supports: "10k",
    donations: "2K+",
    status: "Tax Benefits",
    subTxt: "People Need Food",
    id: "ff2f148a-6ede-494e-b298-49ee27f853e5",
  },
];

export const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
};

export const blogSettings = {
  dots: false,
  slidesToShow: 2,
};

export const bannerImages = [
  { img: banner1, altImgName: "plastic" },
  { img: banner2, altImgName: "deepam" },
  { img: banner3, altImgName: "eduacation" },
  { img: banner4, altImgName: "devotees" },
];

export const totalCounts = [
  { count: "4.7M", text: "Donations" },
  { count: "6M", text: "Lives Impacted" },
  { count: "4500", text: "Verified Non Profits" },
  { count: "400", text: "Corporate Partners" },
];

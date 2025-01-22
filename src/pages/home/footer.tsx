import AppLogo from "@/components/utils/appLogo";
import { staticText } from "@/helper/staticText";
import {
  //   FaFacebook,
  //   FaTwitter,
  FaInstagramSquare,
  //   FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isHomePath = location.pathname === "/";
  const socialIcons = [
    // <FaFacebook color="#666" size="20" />,
    // <FaTwitter color="#666" size="20" />,
    <FaInstagramSquare color="#666" size="20" />,
    // <FaYoutube color="#666" size="20" />,
    <FaLinkedin color="#666" size="20" />,
  ];

  return (
    <div className="bg-[#F1F5F9]  px-4  sm:px-9 py-4">
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div>
          <p className="text-[18px]">About Us</p>
          <div className="flex flex-col gap-2 mt-3 text-[#666]">
            <p>About DoKarma</p>
            <p>Blog</p>
            <p>Careers</p>
            <Link to="/contact-us" className="cursor-pointer">
              Contact us
            </Link>
          </div>
        </div>
        <div>
          <p className="text-[18px]">Fundraiser Support</p>
          <div className="flex flex-col gap-2 mt-3 text-[#666]">
            <p>FAQs</p>
            <p>Reach out</p>
          </div>
        </div>
        <div>
          <p className="text-[18px]">Start a Fundraiser for</p>
          <div className="flex flex-col gap-2 mt-3 text-[#666]">
            <p>NGO</p>
          </div>
        </div>
        <div>
          <p className="text-[18px]">Donate to</p>
          <div className="flex flex-col gap-2 mt-3 text-[#666]">
            <p>Social Causes</p>
            <p>NGOs</p>
          </div>
        </div>
        <div className="flex justify-end gap-x-7">
                    {socialIcons.map(e => <div>{e}</div>)}
                </div>
      </div> */}
      <div
        className={`${
          !isHomePath && "hidden"
        } my-4 p-4 bg-[#ebeef0] border-b pb-4`}
      >
        <p className="font-semibold mb-2">Disclaimer</p>
        <p className="text-[#666] text-[12px] md:text-[14px]">
          {staticText.discalimer}
        </p>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 sm:col-span-6 flex items-center justify-center sm:justify-start pb-3 sm:pb-0">
          <AppLogo />
        </div>
        <div className="col-span-12 sm:col-span-6 flex justify-end">
          <div className="w-full flex justify-between items-center sm:justify-end sm:gap-8 text-[15px] text-[#222222]">
            <div className="flex gap-4 sm:gap-8">
              {socialIcons.map((e, index) => (
                <div key={index}>{e}</div>
              ))}
            </div>
            <div className="flex gap-4 sm:gap-8">
              <Link to="/contact-us">Contact</Link>
              <Link to="/terms-and-conditions">Terms</Link>
              <Link to="/privacy">Privacy</Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col sm:flex-row justify-between items-center"></div> */}
    </div>
  );
};

export default Footer;

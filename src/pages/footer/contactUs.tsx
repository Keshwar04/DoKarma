// import conatctus from "@/assets/Contact_illustration.webp";
import { staticText } from "@/helper/staticText";
import { Mail } from "lucide-react";
// import {Phone } from "lucide-react";
const ContactUs = () => {
  return (
    <div className="my-5 flex-grow bg-[#F1F5F9] rounded p-5 flex flex-col">
      <h1 className="font-bold text-[20px] md:text-[36px]">Contact Us</h1>
      <p className="text-[#666]">{staticText.contactUs}</p>
      {/* <img src={conatctus} className="my-8" /> */}
      <div className="space-y-3 sm:pe-10 mt-5">
        <p className="text-[15px]">
          {/* {staticText.officeLocation} */}
          Beyondo Global Foundation (DoKarma)
        </p>
        <p>No.84 Sannathi Street, Tiruvannamala, Tamil Nadu, India - 606 601</p>
        <div className="flex items-center gap-2">
          <Mail size="18" />
          <a href="mailto:support@dokarma.in" className="text-formColor">
            &nbsp;support@dokarma.in
          </a>
        </div>
        {/* <div className="flex items-center gap-2">
            <Phone size="18" />
            <span className="text-formColor">9195xxxxx</span>
          </div> */}
      </div>
      {/* </div> */}
    </div>
  );
};

export default ContactUs;

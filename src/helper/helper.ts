// import girl from "../assets/Donation/avatarGirlSpecs.png";
import { staticText } from "./staticText";

export const createSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export const previewSettings = {
  // dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
};

export const campaignTypes = {
  donation: {
    title: "Donation",
    subTxt: staticText.createDonation,
    content: staticText.lorem,
  },
  petition: {
    title: "Petition",
    subTxt: staticText.createPetition,
    content: staticText.lorem,
  },
};

export const totalList = [
  { text: "Donations", value: "₹10,280", view: "View Analytics" },
  // { text: 'Signatures', value: '1028', view: 'View Report' },
  { text: "Donors", value: "102", view: "View Analytics" },
  // { text: 'Views', value: '10,280', view: 'View Report' },
  // { text: 'All', value: '1,876', view: 'View Analytics' }
];

// export const supporters = [
//   {
//     name: "Sindy Rheaume",
//     amt: "₹15,000",
//     location: "Madurai",
//     action: "I just wanted to help 💪",
//     img: donor2,
//   },
//   {
//     name: `Michael O'Keefe`,
//     amt: "₹20,000",
//     location: "Coimbatore",
//     action: "Thinking of you two and hoping you get better soon! 🙏",
//     img: donor1,
//   },
//   {
//     name: "Michael Millward",
//     amt: "₹1000",
//     location: "Chennai",
//     action: `Keep strong both 🥺`,
//     img: girl,
//   },
// ];

export const activities = [
  {
    name: "RajKumar",
    area: "Palani",
    dept: "Animal Welfare",
    amt: "₹ 12,000",
    gender: "male",
  },
  {
    name: "Vimal Raj",
    area: "Karur ",
    dept: "Education",
    amt: "₹ 8,000",
    gender: "male",
  },
  {
    name: "Jai kumar",
    area: "Salem",
    dept: "Animal Welfare",
    amt: "₹ 10,000",
    gender: "male",
  },
  {
    name: "Jayasree",
    area: "Erode",
    dept: "Social Welfare",
    amt: "₹ 19,000",
    gender: "female",
  },
  {
    name: "karthik",
    area: "Trichy",
    dept: "Animal Welfare",
    amt: "₹ 2,000",
    gender: "male",
  },
  {
    name: "Kumar",
    area: "Madurai",
    dept: "Social Welfare",
    amt: "₹ 1,000",
    gender: "male",
  },
  {
    name: "Vignesh",
    area: "Namakkal",
    dept: "Animal Welfare",
    amt: "₹ 13,000",
    gender: "male",
  },
  {
    name: "Selvi",
    area: "Tirupur",
    dept: "Social Welfare",
    amt: "₹ 12,000",
    gender: "female",
  },
  {
    name: "Ganesh",
    area: "Chennai",
    dept: "Poverty",
    amt: "₹ 11,000",
    gender: "male",
  },
  {
    name: "Supriya",
    area: "Trichy",
    dept: "Animal Welfare",
    amt: "₹ 7,000",
    gender: "female",
  },
];

export const campaignDonation = [
  {
    title: "Total Donations",
    amt: "₹10,002",
    compare: "Compared to previous month",
    perc: "10%",
    status: "high",
  },
  {
    title: "Total Donations",
    amt: "₹12,505",
    compare: "Compared to yesterday",
    perc: "35.4%",
    status: "low",
  },
  {
    title: "Average Donations per Campaign",
    amt: "34%",
    compare: "Compared to previous month",
    perc: "4.5%",
    status: "low",
  },
  {
    title: "Active Campaigns",
    amt: "13",
    compare: "Compared to previous month",
    perc: "12.2%",
    status: "high",
  },
];

export const tableHeaders = [
  "Fundraiser",
  "Title",
  "Category",
  "Amount raised",
  "Goal",
  "Achieved",
  "Donors",
];

export const tableDatas = [
  {
    fundraiser: "Raj Kumar ",
    title: "Lorem Ipsum simply ",
    category: "Lorem Ipsum simply ",
    amountRaised: "₹1,00,000 ",
    goal: "₹1,00,000",
    achieved: "80%",
    donors: "Lorem Ipsum simply ",
  },
];

export const homePaths = ["/contact-us", "/terms-and-conditions", "/privacy"];

import { staticText } from "./staticText";
import education from "@/assets/montly-details/Education-monthly.jpg";
import hunger from "@/assets/montly-details/Hunger-monthly.jpg";
import temple from "@/assets/montly-details/Temple-monthly.jpg";
export const pledgeContents = [
  {
    id: 1,
    img: education,
    title: staticText.education.header,
    content: staticText.education.content,
    subHeader: staticText.education.subHeader,
    point1: staticText.education.keyPoints.point1,
    point2: staticText.education.keyPoints.point2,
    point3: staticText.education.keyPoints.point3,
    point4: staticText.education.keyPoints.point4,
    description: staticText.education.description,
    contentBold: staticText.education.boldText1,
    descriptionBold: staticText.education.boldText2,
    verifyTitle: "Education For Everyone",
  },
  {
    id: 2,
    img: temple,
    title: staticText.temple.header,
    content: staticText.temple.content,
    subHeader: staticText.temple.subHeader,
    point1: staticText.temple.keyPoints.point1,
    point2: staticText.temple.keyPoints.point2,
    point3: staticText.temple.keyPoints.point3,
    description: staticText.temple.description,
    contentBold: staticText.temple.boldText1,
    descriptionBold: staticText.temple.boldText2,
    verifyTitle: "Stop Temple Ruins",
  },
  {
    id: 3,
    img: hunger,
    title: staticText.hunger.header,
    content: staticText.hunger.content,
    subHeader: staticText.hunger.subHeader,
    point1: staticText.hunger.keyPoints.point1,
    point2: staticText.hunger.keyPoints.point2,
    point3: staticText.hunger.keyPoints.point3,
    description: staticText.hunger.description,
    contentBold: staticText.hunger.boldText1,
    descriptionBold: staticText.hunger.boldText2,
    verifyTitle: "Support Against Hunger",
  },
];

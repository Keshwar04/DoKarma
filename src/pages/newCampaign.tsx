/**
 * NewCampaign Component
 *
 * This component renders the new campaign creation page for DoKarma.
 * It consists of two main sections:
 * 1. Campaign Creation Form: Allows users to create a new campaign
 * 2. Campaign Preview: Displays a carousel of sample campaigns
 *
 * The component uses various UI components from the project's custom UI library,
 * such as Button, Card, Carousel, and AvatarActive.
 *
 * It also incorporates responsive design for different screen sizes and
 * uses CSS modules for styling (styles from newCampaign.module.css).
 *
 * The preview section includes an auto-playing carousel showcasing sample campaigns
 * with donor information, progress bars, and donation buttons.
 */

import styles from "../css/newCampaign.module.css";
import { staticText } from "../helper/staticText";
import Autoplay from "embla-carousel-autoplay";
import babyMom from "../assets/babyMom.png";
import { GrLocation } from "react-icons/gr";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CampaignCreation from "../components/utils/campaignCreation";
import AvatarActive from "../components/utils/avatarActive";
import RandomAvatar from "../components/utils/randomAvatar";
// import ReactHelmet from "@/components/utils/reactHelmet";
// import CampaignsSearch from '../components/utils/campaignsSearch';

const NewCampaign = () => {
  return (
    <>
      {/* <CampaignsSearch /> */}
      {/* <ReactHelmet title="New Campaign" /> */}
      <div className="grid grid-cols-12 gap-x-4 my-4">
        <div className="col-span-12 md:col-span-6 my-2 pt-4">
          <CampaignCreation />
        </div>
        <div
          style={{ backgroundImage: `url(${babyMom})` }}
          className="col-span-12 md:col-span-6 flex items-center 
                    rounded-md bg-cover mt-6 mb-2"
        >
          <div
            className={`mx-auto my-2 md:mt-0 shadow-sm rounded-lg
                         ${styles.infoConatiner}`}
          >
            <Carousel
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {Array.from({ length: 3 }).map((_, i) => (
                  <CarouselItem key={i}>
                    <Card>
                      <CardContent>
                        <div key={i + 1}>
                          <div className="flex">
                            <AvatarActive />
                            <h5 className="mt-2 ms-2">{staticText.feed}</h5>
                          </div>
                          <div className="ms-2">
                            <p className={styles.status}>
                              {staticText.personStatus}
                            </p>
                            <div className="flex flex-wrap items-center my-3">
                              {/* <div className={`${styles.yellowCircle} h-[42px] w-[42px] rounded-full bg-primaryClr
                                                            flex items-center justify-center`}>
                                                                <img src={avatarSmile} />
                                                            </div> */}
                              <RandomAvatar seed="Ryker" width="40" />
                              <p
                                className={`ms-2 flex items-center ${styles.personDetails}`}
                              >
                                Vinay&nbsp; <GrLocation />
                                &nbsp; Thiruvanamalai, Tamil Nadu
                              </p>
                              <Button
                                size="sm"
                                className="ms-auto bg-pimaryBtn hover:bg-primaryClr text-black"
                              >
                                Donate Karma
                              </Button>
                            </div>
                            <div className="flex flex-wrap items-center">
                              {Array.from({ length: 7 }).map((_, idx) => (
                                // <div key={e} className={styles.greenCircle}>
                                //     <img src={e} />
                                // </div>
                                <div className="me-1">
                                  <RandomAvatar
                                    seed={idx.toString()}
                                    width="20"
                                  />
                                </div>
                              ))}
                              <div className={styles.grayCircle}>+99</div>
                              <div className={styles.range}>
                                <div className={styles.perc}></div>
                              </div>
                              <h5 className="ms-auto mt-2">
                                ₹ 10,000 / ₹ 5,00,000
                              </h5>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCampaign;

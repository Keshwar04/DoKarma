/* eslint-disable @typescript-eslint/no-explicit-any */
import seaBg from "@/assets/seaBg.png";
import BgImageShare from "@/components/utils/bgImageShare";
import RandomAvatar from "@/components/utils/randomAvatar";
import styles from "@/css/profile.module.css";

const BannerImage = ({ userInfo }: any) => {
  return (
    <div className="w-[80%] ms-auto">
      <div className={styles.cardContainer}>
        <BgImageShare bgImg={userInfo.bannerImg || seaBg} isProfile={true} />
        <div className={styles.cardDetails}>
          <div className="flex">
            <RandomAvatar
              seed={
                userInfo.gender == "Male"
                  ? "Avery"
                  : userInfo.gender == "Female"
                  ? "Kingston"
                  : ""
              }
              width="64"
            />
            <div className="ms-3">
              <p className={styles.name}>{userInfo.name}</p>
              <p className={styles.txts}>{userInfo.location}</p>
            </div>
          </div>
          <div className="flex justify-between mt-5 ms-1">
            <p className={styles.txts}>8 Successful Campaigns</p>
            <p className={styles.txts}>1 Year</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerImage;

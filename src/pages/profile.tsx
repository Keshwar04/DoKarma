/**
 * Profile component for DoKarma
 *
 * Renders the profile page layout with a navigation sidebar and search input.
 * Uses React Router for navigation and Zustand for state management.
 * Displays profile menu options with icons and handles navigation between different profile sections.
 * Renders child routes using Outlet from React Router.
 */

// import styles from '../css/profile.module.css'
// import { profileNavbar } from '../helper/profile/profileNavbar'
// import { AiOutlineSetting, AiOutlineHistory } from "react-icons/ai";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { MdOutlineFavoriteBorder } from "react-icons/md";
// import SearchInput from '../components/utils/forms/searchInput';
// import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
// import { useFormStore } from '@/store/zustand';
// import { useEffect } from 'react';
const Profile = () => {
  // const navigate = useNavigate()
  // const { setProfileMenu } = useFormStore()
  // const {  profileMenu } = useFormStore()
  // const icons = [
  //     <AiOutlineSetting className={styles.icon} />,
  //     <IoMdNotificationsOutline className={styles.icon} />,
  //     <MdOutlineFavoriteBorder className={styles.icon} />,
  //     <AiOutlineHistory className={styles.icon} />
  // ]

  // const handleNavigate = (e: any) => {
  //     navigate(e.link)
  //     setProfileMenu(e.title)
  // }
  // useEffect(() => {
  //     setProfileMenu('Profile')
  // }, [])

  return (
    <>
      {/* <div className={`grid grid-cols-12 px-4 sm:px-9 -mx-4 sm:-mx-9 py-3 ${styles.profileContainer}`}>
                <div className='col-span-12 md:col-span-7 mb-2 md:mb-0'>
                    <ul>
                        {profileNavbar.map((e, i) => (
                            <div key={e.title}
                                className={`${e.title == profileMenu && 'bg-pimaryBtn p-2 rounded-[6px]'}
                                ${styles.listContainer}`}
                                onClick={() => handleNavigate(e)}>
                                <li>{icons[i]}</li>
                                <li className={styles.title}>&nbsp; {e.title}</li>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className='col-span-12 md:col-span-5 flex justify-end mt-2 md:mt-0'>
                    <SearchInput />
                </div>
            </div> */}
      <Outlet />
    </>
  );
};

export default Profile;

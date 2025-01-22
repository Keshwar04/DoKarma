import styles from '../../css/footer.module.css'
import AppLogo from '../../components/utils/appLogo';
import { staticText } from '@/helper/staticText';
import { useLocation } from 'react-router-dom';
const Footer = () => {
  const location = useLocation()
  const isHomePath = location.pathname == '/'
  return (
    <>
      {!isHomePath &&
        <div className='border-t bg-[#F1F5F9] py-4 px-4 sm:px-9 flex flex-col 
    sm:flex-row items-center justify-between'>
          <AppLogo />
          <p className={`mt-2 sm:mt-0 ${styles.region}`}>
            {staticText.footer}
          </p>
        </div>}
    </>
  )
}

export default Footer

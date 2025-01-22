import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../../../css/mobileMenu.module.css'
import { homePaths } from '@/helper/helper'

const MobileMenu = ({ item, setSidebar, idx }: any) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const handleNavigate = (item: any, subMenu?: string) => {
    if (subMenu) {
      setOpen(!open)
    }
    navigate(item.url)
    setSidebar(false)
  }

  const isActive = (href: string) => {
    if (href === '/' && homePaths.some(path => location.pathname.startsWith(path))) {
      return true;
    }
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {
        item.submenu ?
          <div className={`${open && styles.open} ${styles.sidebarItem}`}>
            <div className={styles.sidebarTitle}>
              <span
                className='cursor-pointer'
                style={{ color: isActive(item.url) ? 'var(--primary-clr)' : '' }}
                onClick={() => handleNavigate(item, 'open')}>
                {item.title}
              </span>
            </div>
            <div className={styles.sidebarContent}>
              {item.submenu.map((child: any, index: number) =>
                <MobileMenu key={index} item={child} idx={idx}
                  setSidebar={setSidebar} />)}
            </div>
          </div>
          :
          <a className={`${styles.sidebarItem} ${styles.plain}"`}
            style={{ color: isActive(item.url) ? 'var(--primary-clr)' : '' }}
            onClick={() => handleNavigate(item)}>
            {item.title}
          </a>
      }
    </>
  )
}

export default MobileMenu

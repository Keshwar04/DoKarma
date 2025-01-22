import { useState, useEffect, useRef } from 'react';
import Dropdown from './dropdown';
import styles from '../../../css/desktopMenu.module.css'
import { Link, useLocation } from 'react-router-dom';
import { homePaths } from '@/helper/helper';
// import { useMenuStore } from '../../../store/zustand';

const DesktopMenu = ({ items, idx, depthLevel }: any) => {

  const [dropdown, setDropdown] = useState(false);
  let eleRef = useRef<HTMLLIElement>(null);
  const location = useLocation()
  useEffect(() => {
    const handler = (event: any) => {
      if (
        dropdown &&
        eleRef.current &&
        !eleRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);


  const onMouseEnter = () => window.innerWidth > 768 && setDropdown(true);
  const onMouseLeave = () => window.innerWidth > 768 && setDropdown(false);
  const closeDropdown = () => dropdown && setDropdown(false);

  const isActive = (href: string) => {
    if (href === '/' && homePaths.some(path => location.pathname.startsWith(path))) {
      return true;
    }
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <li
      className={styles.menuItems}
      ref={eleRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.url && items.submenu ? (
        <>
          <button type="button" aria-haspopup="menu"
            className={`${isActive(items.url) ? 'bg-pimaryBtn' : ''}`}>
            <Link to={items.url}>
              {items.title}
            </Link>
            <span className={styles.arrow} />
          </button>
          <Dropdown depthLevel={depthLevel} submenus={items.submenu}
            dropdown={dropdown} idx={idx} />
        </>
      ) : (
        <Link to={items.url}
          className={`${isActive(items.url) ? 'bg-pimaryBtn' : ''}`} >
          {items.title}
        </Link>
      )}
    </li>
  );
};

export default DesktopMenu;

import DesktopMenu from './desktopMenu';
import styles from '../../../css/desktopMenu.module.css'
const Dropdown = ({ submenus, dropdown, depthLevel, idx }: any) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';
    return (
        <ul className={`${styles.dropdown} ${styles[dropdownClass]} 
        ${dropdown ? styles.show : ''}`}>
            {submenus.map((submenu: any, index: number) => (
                <DesktopMenu
                    items={submenu}
                    idx={idx}
                    key={index}
                    depthLevel={depthLevel}
                />
            ))}
        </ul>
    );
};

export default Dropdown;

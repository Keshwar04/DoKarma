
import styles from '../../../css/forms.module.css'
import { Input } from "@/components/ui/input"
import { LuSearch } from "react-icons/lu";
const SearchInput = () => {
    return (
        <div className={`order-1 md:order-2 mb-3 md:mb-0 ${styles.searchContainer}`}>
            <LuSearch className={styles.searchIcon} />
            <Input type='text' placeholder='Search' />
        </div>
    )
}

export default SearchInput

import SearchBarClasses from './searchBar.module.css';
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
    return ( <div className={SearchBarClasses['search-bar']}>
        <div className={SearchBarClasses['search-icon-container']}>
            <CiSearch className={SearchBarClasses['search-icon']} />
        </div>
    <input type="search"/>
</div> );
}
 
export default SearchBar;
import { useNavigate } from 'react-router-dom';
import SearchBarClasses from './searchBar.module.css';
import { CiSearch } from "react-icons/ci";
import { useState } from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const onChangeSearchInput = (e)=> {
        setQuery(e.target.value);
    }

    const handleSearch = ()=> {
        if(query==='') return;
        navigate(`/search?query=${query}`)
    }

    const onKeyDownSearch = (e) => {
        if(query==='') return;
        if (e.key === 'Enter') {
          handleSearch();
        }
    }

    return ( <div className={SearchBarClasses['search-bar']}>
            <div 
                className={SearchBarClasses['search-icon-container']}
                onClick={handleSearch}
                >
                <CiSearch className={SearchBarClasses['search-icon']} />
            </div>
            <input
                type="search"
                onKeyDown={onKeyDownSearch}
                onChange={onChangeSearchInput}
                value={query}
                />
    </div> );
}
 
export default SearchBar;
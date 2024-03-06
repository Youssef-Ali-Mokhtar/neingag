import NavbarClasses from './navbar.module.css';
import SearchBar from '../components/search-bar/SearchBar';
import NavbarButtons from '../components/navbar-buttons/NavbarButtons';
import NavbarLogo from '../components/navbar-logo/NavbarLogo';



const Navbar = () => {
    return ( <div className={NavbarClasses['navbar']}>
        <NavbarLogo/>
        <SearchBar/>
        <NavbarButtons/>
    </div> );
}
 
export default Navbar;
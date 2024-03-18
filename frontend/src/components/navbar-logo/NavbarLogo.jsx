import NavbarLogoClasses from './navbarLogo.module.css';
import { IoMdMenu } from "react-icons/io";
import { useDrawerContext } from '../../hooks/useDrawerContext';
import { Link } from 'react-router-dom';
const NavbarLogo = () => {
    const {setDrawer} = useDrawerContext();

    return ( <Link to="/" className={NavbarLogoClasses['logo']}>
        <div className={NavbarLogoClasses['menu-icon-container']} onClick={setDrawer}>
            <IoMdMenu className={NavbarLogoClasses['menu-icon']}/>
        </div>
        NeinGAG
    </Link> );
}
 
export default NavbarLogo;
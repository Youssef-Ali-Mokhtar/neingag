import NavbarLogoClasses from './navbarLogo.module.css';
import { IoMdMenu } from "react-icons/io";
import { useDrawerContext } from '../../hooks/useDrawerContext';
const NavbarLogo = () => {
    const {setDrawer} = useDrawerContext();

    return ( <div className={NavbarLogoClasses['logo']}>
        <div className={NavbarLogoClasses['menu-icon-container']} onClick={setDrawer}>
            <IoMdMenu className={NavbarLogoClasses['menu-icon']}/>
        </div>
        
        NeinGAG
    </div> );
}
 
export default NavbarLogo;
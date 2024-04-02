import DrawerClasses from './drawer.module.css';
import { useDrawerContext } from '../hooks/useDrawerContext';

const Drawer = () => {
    const {drawer} = useDrawerContext();

    const drawerClass = `${DrawerClasses['drawer']} ${
        drawer ? '' : DrawerClasses['closed']
      }`;

    return ( <div className={drawerClass}>
        This is a drawer!
    </div> );
}

export default Drawer;
import { Link } from 'react-router-dom';
import DrawerClasses from './drawer.module.css';

const DrawerListItem = ({onClick, title, path}) => {
    return ( <Link
        to={path}
        className={DrawerClasses['drawer-list-item']}
        onClick={onClick}
        >
        {title}
    </Link> );
}
 
export default DrawerListItem;
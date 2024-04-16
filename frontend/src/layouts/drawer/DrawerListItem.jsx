import { Link } from 'react-router-dom';
import DrawerClasses from './drawer.module.css';

const DrawerListItem = ({onClick, title, path, image}) => {
    return ( <Link
        to={path}
        className={DrawerClasses['drawer-list-item']}
        onClick={onClick}
        >
        <img src={image} alt="pic"/>
        {title}
    </Link> );
}
 
export default DrawerListItem;
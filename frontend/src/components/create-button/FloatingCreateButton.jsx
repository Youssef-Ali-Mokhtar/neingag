import createButtonClasses from './floating-create-button.module.css';
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const FloatingCreateButton = () => {
    return ( <Link to='/create-post' className={createButtonClasses['floating-create-button']}>
        <FaPlus/>
    </Link> );
}
 
export default FloatingCreateButton;
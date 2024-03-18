import CreateButtonClasses from './createButton.module.css';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";

const CreateButton = () => {
    return ( <Link to='/create-post' className={CreateButtonClasses['create-button']}>
        <FaPlus className={CreateButtonClasses['create-button-icon']}/>
        <p>Create</p>
    </Link> );
}
 
export default CreateButton;
import CreateButtonClasses from './createButton.module.css';
import { FaPlus } from "react-icons/fa6";

const CreateButton = () => {
    return ( <button className={CreateButtonClasses['create-button']}>
        <FaPlus className={CreateButtonClasses['create-button-icon']}/>
        <p>Create</p>
    </button> );
}
 
export default CreateButton;
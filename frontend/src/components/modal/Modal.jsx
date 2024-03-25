import modalClasses from './modal.module.css';
import { IoMdClose } from "react-icons/io";

const Modal = ({children, handleModal}) => {

    const handleChildModal = (e)=> {
        e.stopPropagation();
    }
    return ( <div className={modalClasses['backdrop']} onClick={handleModal}>
        <div className={modalClasses['modal']} onClick={handleChildModal}>
            <div className={modalClasses['modal-header']}>
                <IoMdClose onClick={handleModal} className={modalClasses['close-button']}/>
            </div>
            { children }
        </div>

    </div> );
}

export default Modal;
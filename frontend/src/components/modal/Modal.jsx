import modalClasses from './modal.module.css';
import { IoMdClose } from "react-icons/io";
import { useAuthModalContext } from './../../hooks/useAuthModalContext';

const Modal = ({children, title}) => {
    const { handleAuthModal } = useAuthModalContext();
    const handleChildModal = (e)=> {
        e.stopPropagation();
    }
    return ( <div className={modalClasses['backdrop']} onClick={handleAuthModal}>
        <div className={modalClasses['modal']} onClick={handleChildModal}>
            <div className={modalClasses['modal-header']}>
                <IoMdClose onClick={handleAuthModal} className={modalClasses['close-button']}/>
                <p className={modalClasses['title']}>{title}</p>
            </div>
            { children }
        </div>

    </div> );
}

export default Modal;
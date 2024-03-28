import AuthButtonClasses from './../navbarButtons.module.css';
import { useAuthModalContext } from './../../../hooks/useAuthModalContext';

const AuthButton = () => {
    const { handleAuthModal } = useAuthModalContext();
    return ( <div 
        onClick={handleAuthModal}
        className={AuthButtonClasses['auth-button']}
        >
          Log In
    </div> );
}
 
export default AuthButton;
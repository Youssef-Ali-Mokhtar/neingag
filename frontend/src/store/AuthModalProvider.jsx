import { authModalContext } from './auth-modal-context';
import { useState } from 'react';

const AuthModalProvider = ({children}) => {
    const [authModal, setAuthModal] = useState(false);

    const handleAuthModal = ()=> {
        setAuthModal(prev=>!prev);
    }

    const contextValues = {
        authModal: authModal,
        handleAuthModal: handleAuthModal
    }

    return ( <authModalContext.Provider value={contextValues}>
        { children }
    </authModalContext.Provider> );
}
 
export default AuthModalProvider;
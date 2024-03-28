import { useContext } from "react";
import { authModalContext } from "../store/auth-modal-context";

export const useAuthModalContext = ()=> {
    const context = useContext(authModalContext);

    if(!context) {
        throw Error('useAuthContext must be used inside a useAutheContext provider')
    }

    return context;
}
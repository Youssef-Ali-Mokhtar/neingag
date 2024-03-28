import { useContext } from "react";
import { authContext } from "../store/auth-context";

export const useAuthContext = ()=> {
    const context = useContext(authContext);

    if(!context) {
        throw Error('useAuthContext must be used inside a useAutheContext provider')
    }

    return context;
}
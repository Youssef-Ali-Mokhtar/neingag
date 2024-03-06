import { useContext } from "react";
import { drawerContext } from "../store/drawer-context";

export const useDrawerContext = ()=> {
    const context = useContext(drawerContext);

    if(!context) {
        throw Error('useAuthContext must be used inside a useAutheContext provider')
    }

    return context;
}
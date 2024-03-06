import { drawerContext } from "./drawer-context";
import { useState } from "react";

const DrawerProvider = ({children}) => {
    const [drawer, setDrawer] = useState(true);

    const handleDrawer = ()=> {
        setDrawer(prev=>!prev);
    }

    const contextValues = {
        drawer: drawer,
        setDrawer: handleDrawer
    }

    return ( <drawerContext.Provider value={contextValues}>
        { children }
    </drawerContext.Provider> );
}
 
export default DrawerProvider;
import { drawerContext } from "./drawer-context";
import { useEffect, useState } from "react";

const DrawerProvider = ({children}) => {
    const [drawer, setDrawer] = useState(()=>{
        if(window.innerWidth <= 1100){
          return false;
        } else {
          return true;
        }
    });

    const handleDrawer = (event)=> {
      if(event) {
        event.preventDefault();
      }
        
        setDrawer(prev=>!prev);
    }

    const contextValues = {
        drawer: drawer,
        setDrawer: handleDrawer
    }

    useEffect(() => {
        const handleResize = () => {
          if(window.innerWidth <= 1100){
            setDrawer(false);
          } else {
            setDrawer(true);
          }
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return ( <drawerContext.Provider value={contextValues}>
        { children }
    </drawerContext.Provider> );
}
 
export default DrawerProvider;
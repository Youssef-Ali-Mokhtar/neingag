import { createContext } from "react";

export const drawerContext = createContext({
    drawer: true,
    setDrawer: ()=>{}
})
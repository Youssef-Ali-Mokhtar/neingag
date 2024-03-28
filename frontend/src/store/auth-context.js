import { createContext } from "react";

export const authContext = createContext({
    user: null,
    login:()=>{},
    logout:()=>{}
})
import { createContext } from "react";

export const authModalContext = createContext({
    authModal: false,
    handleAuthModal: ()=>{}
})
import { createContext } from "react";

export const noteContext = createContext({
    notifications: 0,
    addNotification:()=>{},
    resetNotifications:()=>{}
})
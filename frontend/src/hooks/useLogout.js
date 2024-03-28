import { useAuthContext } from "./useAuthContext"

export const useLogout = ()=> {
    const { handleLogout } = useAuthContext();
    
    return handleLogout;
}
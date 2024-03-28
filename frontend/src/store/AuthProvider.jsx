import { useEffect, useReducer } from "react";
import { authContext } from "./auth-context";

const reducerValue = {
    user: null
}

const authReducer = (state, action)=> {
    switch (action.type) {
        case 'LOGIN':
          return { user: action.payload };
        case 'LOGOUT':
          return { user: null };
        default:
          return state;
      }
}

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, reducerValue);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        dispatch({type: 'LOGIN', payload: user})
    }, []);


    const handleLogin = (userData)=> {
        localStorage.setItem('user',JSON.stringify(userData));
        dispatch({type: 'LOGIN', payload: userData})
    }

    const handleLogout = ()=> {
        localStorage.setItem('user', null);
        dispatch({type: 'LOGOUT'});
    }

    const authValues = {
        user: state.user,
        handleLogin: handleLogin,
        handleLogout: handleLogout
    }

    return ( <authContext.Provider value={ authValues }>
        { children }
    </authContext.Provider> );
}
 
export default AuthProvider;
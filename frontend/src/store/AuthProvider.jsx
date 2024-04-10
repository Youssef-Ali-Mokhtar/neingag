import { useEffect, useReducer } from "react";
import { authContext } from "./auth-context";
import openSocket from 'socket.io-client';
import { useNoteContext } from './../hooks/useNoteContext';

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
    const { 
        notifications,
        addNotification
    } = useNoteContext();

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));

        let socket;

        if(user) {
            console.log("SOCKET!!");
            socket = openSocket('http://localhost:4000', {
                query: { token:user.token }
            });

            socket.on('newComment', (data) => {
                console.log('Received a comment:', data);
                console.log(notifications);
                addNotification();
              });

        }

        dispatch({type: 'LOGIN', payload: user})

        return () => {
            // Clean up the socket connection when component unmounts
            socket.disconnect();
          };
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
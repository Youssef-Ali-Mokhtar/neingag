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
        addNotification,
        resetNotifications
    } = useNoteContext();

    const fetchUncheckedNotifications = (user) => {
        resetNotifications();

        fetch(`http://localhost:4000/api/users/unchecked-notifications`, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
        })
            .then(response => {
                return response.json();
            })
            .then(numOfUncheckedNotifications => {
                addNotification(numOfUncheckedNotifications);
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        let socket;

        if(user) {

            //fetch unchecked notifications
            fetchUncheckedNotifications(user);

            socket = openSocket('http://localhost:4000', {
                query: { token:user.token }
            });

            socket.on('newComment', (data) => {
                console.log('Received a comment:', data);
                console.log(notifications);
                addNotification(1);
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
        fetchUncheckedNotifications(userData);
        dispatch({type: 'LOGIN', payload: userData});
    }

    const handleLogout = ()=> {
        localStorage.setItem('user', null);
        resetNotifications();
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
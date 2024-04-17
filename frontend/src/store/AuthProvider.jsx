import { useEffect, useReducer, useRef } from "react";
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

    const socketRef = useRef(null); // Ref to hold the socket connection

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if(user) {
            //fetch unchecked notifications
            resetNotifications();

            fetchUncheckedNotifications(user);

            // Establish socket connection only if user is logged in
            socketRef.current = openSocket('http://localhost:4000', {
                query: { token: user.token }
            });

            socketRef.current.on('newComment', (data) => {
                addNotification(1);
            });
        }

        dispatch({type: 'LOGIN', payload: user})
        console.log('Hey!');
        return () => {
            // Clean up the socket connection when component unmounts or user logs out
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    const fetchUncheckedNotifications = (user) => {
        resetNotifications();

        fetch(`http://localhost:4000/api/users/unchecked-notifications`, {
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
        })
            .then(response => response.json())
            .then(numOfUncheckedNotifications => addNotification(numOfUncheckedNotifications))
            .catch(err => {
                console.log(err.message);
            });
    }

    const handleLogin = (userData)=> {
        localStorage.setItem('user',JSON.stringify(userData));
        fetchUncheckedNotifications(userData);
        // Reconnect socket on login
        socketRef.current = openSocket('http://localhost:4000', {
            query: { token: userData.token }
        });
        dispatch({type: 'LOGIN', payload: userData});
    }

    const handleLogout = ()=> {
        localStorage.removeItem('user');
        resetNotifications();
        dispatch({type: 'LOGOUT'});
        // Disconnect socket on logout
        if (socketRef.current) {
            socketRef.current.disconnect();
        }
    }

    const authValues = {
        user: state.user,
        handleLogin: handleLogin,
        handleLogout: handleLogout
    }

    return ( 
        <authContext.Provider value={ authValues }>
            { children }
        </authContext.Provider>
    );
}
 
export default AuthProvider;

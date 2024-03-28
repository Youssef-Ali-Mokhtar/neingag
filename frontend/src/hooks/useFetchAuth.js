import { useState } from 'react';
import { useAuthModalContext } from './useAuthModalContext';
import { useAuthContext } from './useAuthContext';

const useFetchAuth = ()=> {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const {
        handleLogin
    } = useAuthContext();

    const { handleAuthModal } = useAuthModalContext();
    const fetchAuth = (input, type)=>{
        console.log(input, type);
        setError(null);
        fetch(`http://localhost:4000/api/users/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(input)
            })
            .then(response => {
    
                return response.json()
                    .then(data => {
                        if (!response.ok) {
                            console.log(data);  
                            setError(data);
    
                        } else {
                            console.log('Login successful:', data);
                            setData(data);
                            handleLogin(data);
                            handleAuthModal();
                        }
                })
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message);
            });
    }

    return {fetchAuth, data, error};
}

export default useFetchAuth;
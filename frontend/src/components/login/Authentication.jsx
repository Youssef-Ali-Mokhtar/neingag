import { useState } from 'react';
import Modal from './../modal/Modal';
import useAuth from './../../hooks/useAuth';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Authentication = () => {
    const [mode, setMode] = useState('login');
    const [loginInput, setLoginInput] = useState({email:'', password:''});
    const [signupInput, setSignupInput] = useState({username:'',email:'', password:''});

    const {
        fetchAuth,
        data,
        error
    } = useAuth();
    console.log(data);
    const handleMode = (type)=> {
        setMode(type);
    }

    const handleLoginInput = (event)=> {
        setLoginInput(prev=>({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const handleSignupInput = (event)=> {
        setSignupInput(prev=>({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const handleLoginSubmit = (event)=> {
        event.preventDefault();
        fetchAuth(loginInput, 'login');
    }

    const handleSignupSubmit = (event)=> {
        event.preventDefault();
        fetchAuth(signupInput, 'signup');
    }

    const modeString = 
        (mode==='login'&&'Log In') ||
         (mode==='signup'&&'Sign Up');
    return (
        <Modal 
            title={modeString}>
            {
                mode==='login'?
                <LoginForm
                    handleLoginSubmit={handleLoginSubmit}
                    handleLoginInput={handleLoginInput}
                    loginInput={loginInput}
                    error={error}
                    handleMode={handleMode}
                />
                :
                ''
            }
            {
                mode==='signup'?
                <SignupForm
                    handleSignupSubmit={handleSignupSubmit}
                    handleSignupInput={handleSignupInput}
                    signupInput={signupInput}
                    error={error}
                    handleMode={handleMode}
                />
                :
                ''
            }
            
          </Modal>
        );
}
 
export default Authentication;
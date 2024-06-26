import { useState } from 'react';
import Modal from './../modal/Modal';
import useFetchAuth from './../../hooks/useFetchAuth';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuthContext } from '../../hooks/useAuthContext';
import { pickAvatar } from '../../util/utilFunctions';

const Authentication = () => {
    const [mode, setMode] = useState('login');
    const [loginInput, setLoginInput] = useState({email:'', password:''});
    const [avatar, setAvatar] = useState(pickAvatar());
    const [signupInput, setSignupInput] = useState({
        username:'',
        email:'',
        password:'',
        bio:'My cringe collection!',
        avatarNum:avatar.num});
    const {
        fetchAuth,
        data,
        error
    } = useFetchAuth();

    const { user } = useAuthContext();

    const handleMode = (type)=> {
        setMode(type);
    }

    const handleAvatar = ()=> {
        const currentAvatar = pickAvatar();
        setAvatar(currentAvatar);
        setSignupInput(prev=>({
            ...prev, 
            avatarNum: currentAvatar.num
        }))
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
                    handleAvatar={handleAvatar}
                    avatar={avatar}
                />
                :
                ''
            }
          </Modal>
        );
}
 
export default Authentication;
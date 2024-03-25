import LoginClasses from './login.module.css';
import { useState } from 'react';

const Login = () => {
    const [loginInput, setLoginInput] = useState({email:'', password:''});

    const handleInput = (event)=> {
        setLoginInput(prev=>({
            ...prev, 
            [event.target.name]: event.target.value
        }));
    }
    console.log(loginInput);

    return ( <form className={LoginClasses['login']}>
            <input type='email' name="email" onChange={handleInput} value={loginInput.email} />
            <input type='password' name="password" onChange={handleInput} value={loginInput.password}/>
        </form>
    );
}
 
export default Login;
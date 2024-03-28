import LoginClasses from './login.module.css';

const LoginForm = ({handleLoginSubmit, handleLoginInput, loginInput, error, handleMode}) => {

    return ( <form className={LoginClasses['login']} onSubmit={handleLoginSubmit}>
        <input 
            type='email'
            placeholder="Email"
            name="email" 
            onChange={handleLoginInput} 
            value={loginInput.email} 
            required/>
        <input 
            type='password' 
            placeholder="Password" 
            name="password" 
            onChange={handleLoginInput}
            value={loginInput.password}
            required/>
        {error &&
            <div className={LoginClasses['error-space']}>
                { error }
            </div>
        }
        <button>Login</button>
        <p 
            className={LoginClasses['mode-button']} 
            onClick={handleMode.bind(null, 'signup')}>
                New to NeinGAG? Sign Up
            </p>
    </form> );
}

export default LoginForm;
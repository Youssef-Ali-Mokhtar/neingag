import LoginClasses from './login.module.css';

const SignupForm = ({handleSignupSubmit, handleSignupInput, signupInput, error, handleMode}) => {

    return ( <form className={LoginClasses['login']} onSubmit={handleSignupSubmit}>
        <input 
            type='text'
            placeholder="Username"
            name="username"
            onChange={handleSignupInput} 
            value={signupInput.username} 
            required/>
        <input 
            type='email'
            placeholder="Email" 
            name="email" 
            onChange={handleSignupInput} 
            value={signupInput.email} 
            required/>
        <input 
            type='password' 
            placeholder="Password" 
            name="password" 
            onChange={handleSignupInput} 
            value={signupInput.password}
            required/>
        {error &&
            <div className={LoginClasses['error-space']}>
                { error }
            </div>
        }
        <button>Signup</button>
        <p 
            className={LoginClasses['mode-button']} 
            onClick={handleMode.bind(null, 'login')}>
                Already a NeinGAGer? Log In
            </p>
    </form> );
}

export default SignupForm;
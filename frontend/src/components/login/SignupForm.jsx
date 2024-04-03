import LoginClasses from './login.module.css';

const SignupForm = ({
    handleSignupSubmit, 
    handleSignupInput, 
    signupInput, 
    error, 
    handleMode,
    handleAvatar,
    avatar }) => {

    return ( <form className={LoginClasses['login']} onSubmit={handleSignupSubmit}>
        <img src={avatar.pic} alt='avatar'/>
        <p 
            onClick={handleAvatar}
            className={LoginClasses['img-button']}>
                Random
        </p>
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
        <input 
            type='text'
            placeholder="Bio"
            name="bio"
            onChange={handleSignupInput} 
            value={signupInput.bio}
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
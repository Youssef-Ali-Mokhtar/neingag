import ErrorClasses from './error-page.module.css';
import guyConfused from './../assets/guy-confused.jpg';
import { IoMdReturnLeft } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate(-1);
    };

    return ( <div className={ErrorClasses['error-page']}>
        <h1>Page not found</h1>
        <img 
            src={guyConfused} 
            alt="pic"
        />
        <IoMdReturnLeft
            onClick={goBackHandler}
            className={ErrorClasses['back-icon']}
        />
    </div> );
}
 
export default ErrorPage;
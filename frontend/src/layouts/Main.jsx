import MainClasses from './main.module.css';
import Home from '../pages/Home';

const Main = () => {
    return ( <div className={MainClasses['content-holder']}>
        <Home/>
    </div> );
}
 
export default Main;
import MainClasses from './main.module.css';
import Home from '../pages/Home';
import PostDetails from '../pages/PostDetails';
import CreatePost from '../pages/CreatePost';
import { Route, Routes } from 'react-router-dom';

const Main = () => {
    return ( <div className={MainClasses['content-holder']}>
        <Routes>
            <Route index element={<Home/>}/>
            <Route path="/:id" element={<PostDetails/>}/>
            <Route path="/create-post" element={<CreatePost/>}/>
        </Routes>
    </div> );
}
 
export default Main;
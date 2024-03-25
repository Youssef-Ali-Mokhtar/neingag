import MainClasses from './main.module.css';
import Home from '../pages/Home';
import PostDetails from '../pages/PostDetails';
import CreatePost from '../pages/CreatePost';
import { Navigate, Route, Routes } from 'react-router-dom';
import Profile from '../pages/profile/Profile';
import Bookmarks from '../pages/Bookmarks';
import MyPosts from '../pages/MyPosts';

const Main = () => {
    return ( <div className={MainClasses['content-holder']}>
        <Routes>
            <Route index element={<Home/>}/>
            <Route path="/:id" element={<PostDetails/>}/>
            <Route path="/create-post" element={<CreatePost/>}/>
            <Route path="/profile" element={<Profile/>}>
                <Route index element={<Navigate to="posts" replace />} />
                <Route path="posts" element={<MyPosts/>}/>
                <Route path="bookmarks" element={<Bookmarks/>}/>
            </Route>
        </Routes>
    </div> );
}
 
export default Main;
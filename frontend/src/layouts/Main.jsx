import MainClasses from './main.module.css';
import Home from '../pages/Home';
import PostDetails from '../pages/PostDetails';
import CreatePost from '../pages/CreatePost';
import { Navigate, Route, Routes } from 'react-router-dom';
import Profile from '../pages/profile/Profile';
import Bookmarks from '../pages/Bookmarks';
import MyPosts from '../pages/MyPosts';
import CategoryPosts from '../pages/CaregoryPosts';
import { useAuthContext } from '../hooks/useAuthContext';
import SearchPosts from '../pages/SearchPosts';
import Settings from '../pages/Settings';
import Notifications from '../pages/Notifications';
import ErrorPage from '../pages/ErrorPage';

const Main = () => {
    const { user } = useAuthContext();
    return ( <div className={MainClasses['content-holder']}>
        <Routes>
            <Route index element={<Home/>}/>
            <Route path="/interest/:category" element={<CategoryPosts/>}/>
            <Route path="/search/" element={<SearchPosts/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/notifications" element={<Notifications/>}/>
            <Route path="/post/:id" element={<PostDetails/>}/>
            <Route path="/create-post" element={user? <CreatePost/>: <Navigate to="/" />}/>
            <Route path="/profile/:userId" element={<Profile/>}>
                <Route index element={<Navigate to="posts" replace />} />
                <Route path="posts" element={<MyPosts/>}/>
                <Route path="bookmarks" element={<Bookmarks/>}/>
            </Route>
            <Route path='*' element={<ErrorPage/>}/>
        </Routes>
    </div> );
}
 
export default Main;